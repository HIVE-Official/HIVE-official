#!/bin/bash

# HIVE Platform Deployment Script
# This script handles the complete deployment of the HIVE platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
REGISTRY=${DOCKER_REGISTRY:-"your-registry.com"}
VERSION=${2:-$(git rev-parse --short HEAD)}
NAMESPACE="hive-${ENVIRONMENT}"

echo -e "${BLUE}🚀 Starting HIVE Platform Deployment${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Version: ${VERSION}${NC}"
echo -e "${BLUE}Registry: ${REGISTRY}${NC}"

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
    
    # Check if docker is installed
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed${NC}"
        exit 1
    fi
    
    # Check if kubectl is installed
    if ! command -v kubectl &> /dev/null; then
        echo -e "${RED}❌ kubectl is not installed${NC}"
        exit 1
    fi
    
    # Check if we can connect to Kubernetes cluster
    if ! kubectl cluster-info &> /dev/null; then
        echo -e "${RED}❌ Cannot connect to Kubernetes cluster${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites check passed${NC}"
}

# Function to build Docker images
build_images() {
    echo -e "${YELLOW}🔨 Building Docker images...${NC}"
    
    # Build main web application
    echo -e "${BLUE}Building HIVE web application...${NC}"
    docker build -t ${REGISTRY}/hive-web:${VERSION} -f docker/Dockerfile.production .
    docker tag ${REGISTRY}/hive-web:${VERSION} ${REGISTRY}/hive-web:latest
    
    # Build WebSocket server
    echo -e "${BLUE}Building WebSocket server...${NC}"
    docker build -t ${REGISTRY}/hive-websocket:${VERSION} -f docker/Dockerfile.websocket .
    docker tag ${REGISTRY}/hive-websocket:${VERSION} ${REGISTRY}/hive-websocket:latest
    
    echo -e "${GREEN}✅ Docker images built successfully${NC}"
}

# Function to push Docker images
push_images() {
    echo -e "${YELLOW}📤 Pushing Docker images...${NC}"
    
    docker push ${REGISTRY}/hive-web:${VERSION}
    docker push ${REGISTRY}/hive-web:latest
    docker push ${REGISTRY}/hive-websocket:${VERSION}
    docker push ${REGISTRY}/hive-websocket:latest
    
    echo -e "${GREEN}✅ Docker images pushed successfully${NC}"
}

# Function to deploy to Kubernetes
deploy_k8s() {
    echo -e "${YELLOW}☸️  Deploying to Kubernetes...${NC}"
    
    # Create namespace if it doesn't exist
    kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply ConfigMaps and Secrets first
    echo -e "${BLUE}Applying ConfigMaps...${NC}"
    kubectl apply -f kubernetes/configmap.yaml -n ${NAMESPACE}
    
    # Check if secrets exist, if not create them
    if ! kubectl get secret hive-secrets -n ${NAMESPACE} &> /dev/null; then
        echo -e "${YELLOW}⚠️  Secrets not found. Please create secrets manually:${NC}"
        echo "kubectl create secret generic hive-secrets -n ${NAMESPACE} \\"
        echo "  --from-literal=nextauth-secret=YOUR_SECRET \\"
        echo "  --from-literal=database-url=YOUR_DATABASE_URL \\"
        echo "  --from-literal=firebase-project-id=YOUR_PROJECT_ID \\"
        echo "  --from-literal=firebase-client-email=YOUR_CLIENT_EMAIL \\"
        echo "  --from-literal=firebase-private-key=YOUR_PRIVATE_KEY"
        echo ""
        read -p "Press enter after creating secrets..."
    fi
    
    # Apply persistent volume claims
    echo -e "${BLUE}Applying PVCs...${NC}"
    kubectl apply -f kubernetes/pvc.yaml -n ${NAMESPACE}
    
    # Update image tags in deployment
    sed "s|hive-web:latest|${REGISTRY}/hive-web:${VERSION}|g" kubernetes/deployment.yaml | \
    sed "s|hive-websocket:latest|${REGISTRY}/hive-websocket:${VERSION}|g" | \
    kubectl apply -f - -n ${NAMESPACE}
    
    # Apply services
    echo -e "${BLUE}Applying Services...${NC}"
    kubectl apply -f kubernetes/service.yaml -n ${NAMESPACE}
    
    # Apply HPA
    echo -e "${BLUE}Applying HPA...${NC}"
    kubectl apply -f kubernetes/hpa.yaml -n ${NAMESPACE}
    
    # Apply Ingress
    echo -e "${BLUE}Applying Ingress...${NC}"
    kubectl apply -f kubernetes/ingress.yaml -n ${NAMESPACE}
    
    echo -e "${GREEN}✅ Kubernetes deployment applied${NC}"
}

# Function to wait for deployment
wait_for_deployment() {
    echo -e "${YELLOW}⏳ Waiting for deployment to be ready...${NC}"
    
    # Wait for deployments to be ready
    kubectl rollout status deployment/hive-web -n ${NAMESPACE} --timeout=300s
    kubectl rollout status deployment/websocket-server -n ${NAMESPACE} --timeout=300s
    kubectl rollout status deployment/nginx -n ${NAMESPACE} --timeout=300s
    kubectl rollout status deployment/redis -n ${NAMESPACE} --timeout=300s
    
    echo -e "${GREEN}✅ All deployments are ready${NC}"
}

# Function to run smoke tests
run_smoke_tests() {
    echo -e "${YELLOW}🧪 Running smoke tests...${NC}"
    
    # Get service URL
    SERVICE_URL=$(kubectl get ingress hive-ingress -n ${NAMESPACE} -o jsonpath='{.spec.rules[0].host}')
    
    if [ -z "$SERVICE_URL" ]; then
        SERVICE_URL="localhost"
        echo -e "${YELLOW}⚠️  Using localhost for smoke tests${NC}"
    fi
    
    # Test health endpoints
    echo -e "${BLUE}Testing health endpoints...${NC}"
    
    # Test main application health
    if curl -f -s "http://${SERVICE_URL}/api/health" > /dev/null; then
        echo -e "${GREEN}✅ Main application health check passed${NC}"
    else
        echo -e "${RED}❌ Main application health check failed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}🎉 Smoke tests passed${NC}"
}

# Function to display deployment info
show_deployment_info() {
    echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
    echo ""
    echo -e "${BLUE}Deployment Information:${NC}"
    echo -e "Environment: ${ENVIRONMENT}"
    echo -e "Version: ${VERSION}"
    echo -e "Namespace: ${NAMESPACE}"
    echo ""
    
    echo -e "${BLUE}Service URLs:${NC}"
    kubectl get ingress -n ${NAMESPACE} -o wide
    echo ""
    
    echo -e "${BLUE}Pod Status:${NC}"
    kubectl get pods -n ${NAMESPACE} -o wide
    echo ""
    
    echo -e "${BLUE}Service Status:${NC}"
    kubectl get services -n ${NAMESPACE}
    echo ""
    
    echo -e "${YELLOW}To monitor the deployment:${NC}"
    echo "kubectl get pods -n ${NAMESPACE} -w"
    echo ""
    echo -e "${YELLOW}To check logs:${NC}"
    echo "kubectl logs -f deployment/hive-web -n ${NAMESPACE}"
    echo "kubectl logs -f deployment/websocket-server -n ${NAMESPACE}"
    echo ""
    echo -e "${YELLOW}To rollback if needed:${NC}"
    echo "kubectl rollout undo deployment/hive-web -n ${NAMESPACE}"
    echo "kubectl rollout undo deployment/websocket-server -n ${NAMESPACE}"
}

# Function to rollback deployment
rollback() {
    echo -e "${YELLOW}🔄 Rolling back deployment...${NC}"
    
    kubectl rollout undo deployment/hive-web -n ${NAMESPACE}
    kubectl rollout undo deployment/websocket-server -n ${NAMESPACE}
    kubectl rollout undo deployment/nginx -n ${NAMESPACE}
    
    wait_for_deployment
    
    echo -e "${GREEN}✅ Rollback completed${NC}"
}

# Main deployment function
deploy() {
    check_prerequisites
    build_images
    push_images
    deploy_k8s
    wait_for_deployment
    run_smoke_tests
    show_deployment_info
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "rollback")
        rollback
        ;;
    "build")
        check_prerequisites
        build_images
        ;;
    "push")
        push_images
        ;;
    "smoke-test")
        run_smoke_tests
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|build|push|smoke-test} [version]"
        echo ""
        echo "Commands:"
        echo "  deploy      - Full deployment (default)"
        echo "  rollback    - Rollback to previous version"
        echo "  build       - Build Docker images only"
        echo "  push        - Push Docker images only"
        echo "  smoke-test  - Run smoke tests only"
        echo ""
        echo "Examples:"
        echo "  $0 deploy v1.2.3"
        echo "  $0 rollback"
        echo "  $0 build"
        exit 1
        ;;
esac