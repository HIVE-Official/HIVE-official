#!/bin/bash

# Script to replace all @hive/ui imports with inline components
# This is a temporary fix for chunk 2073 useRef SSG errors

echo "Starting @hive/ui import replacement..."

# Create a backup of files
echo "Creating backups..."
find apps/web/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "@hive/ui" {} \; | while read file; do
  cp "$file" "${file}.bak.hive" 2>/dev/null || true
done

# Function to add inline component definitions
add_inline_components() {
  local file="$1"

  # Check what components are imported
  local imports=$(grep "^import.*from ['\"]@hive/ui['\"]" "$file" | sed -n "s/.*{\s*\(.*\)\s*}.*/\1/p" | tr ',' '\n' | xargs)

  if [ -z "$imports" ]; then
    return
  fi

  echo "Processing: $file"
  echo "  Found imports: $imports"

  # Create the inline component definitions
  local components_def=""

  for component in $imports; do
    component=$(echo "$component" | xargs)  # Trim whitespace
    case "$component" in
      "Button")
        components_def="${components_def}const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }: any) => <button className={\`px-4 py-2 rounded \${className}\`} {...props}>{children}</button>;\n"
        ;;
      "Card")
        components_def="${components_def}const Card = ({ children, className = '', ...props }: any) => <div className={\`border rounded-lg p-4 \${className}\`} {...props}>{children}</div>;\n"
        ;;
      "Badge")
        components_def="${components_def}const Badge = ({ children, variant = 'default', className = '', ...props }: any) => <span className={\`px-2 py-1 text-xs rounded \${className}\`} {...props}>{children}</span>;\n"
        ;;
      "Input")
        components_def="${components_def}const Input = ({ className = '', ...props }: any) => <input className={\`px-3 py-2 border rounded \${className}\`} {...props} />;\n"
        ;;
      "Label")
        components_def="${components_def}const Label = ({ children, className = '', ...props }: any) => <label className={\`text-sm font-medium \${className}\`} {...props}>{children}</label>;\n"
        ;;
      "Select")
        components_def="${components_def}const Select = ({ children, className = '', ...props }: any) => <select className={\`px-3 py-2 border rounded \${className}\`} {...props}>{children}</select>;\n"
        ;;
      "Textarea")
        components_def="${components_def}const Textarea = ({ className = '', ...props }: any) => <textarea className={\`px-3 py-2 border rounded \${className}\`} {...props} />;\n"
        ;;
      "Checkbox")
        components_def="${components_def}const Checkbox = ({ className = '', ...props }: any) => <input type='checkbox' className={\`\${className}\`} {...props} />;\n"
        ;;
      "Switch")
        components_def="${components_def}const Switch = ({ className = '', ...props }: any) => <input type='checkbox' className={\`\${className}\`} {...props} />;\n"
        ;;
      "Slider")
        components_def="${components_def}const Slider = ({ className = '', ...props }: any) => <input type='range' className={\`\${className}\`} {...props} />;\n"
        ;;
      "Progress")
        components_def="${components_def}const Progress = ({ value = 0, className = '', ...props }: any) => <div className={\`bg-gray-200 rounded-full \${className}\`} {...props}><div className='bg-blue-600 h-full rounded-full' style={{ width: \`\${value}%\` }} /></div>;\n"
        ;;
      "Tabs")
        components_def="${components_def}const Tabs = ({ children, defaultValue, className = '', ...props }: any) => <div className={className} {...props}>{children}</div>;\n"
        ;;
      "TabsContent")
        components_def="${components_def}const TabsContent = ({ children, value, className = '', ...props }: any) => <div className={className} {...props}>{children}</div>;\n"
        ;;
      "TabsList")
        components_def="${components_def}const TabsList = ({ children, className = '', ...props }: any) => <div className={\`flex space-x-2 \${className}\`} {...props}>{children}</div>;\n"
        ;;
      "TabsTrigger")
        components_def="${components_def}const TabsTrigger = ({ children, value, className = '', ...props }: any) => <button className={\`px-3 py-1 \${className}\`} {...props}>{children}</button>;\n"
        ;;
      "HiveButton")
        components_def="${components_def}const HiveButton = ({ children, variant = 'default', size = 'default', className = '', ...props }: any) => <button className={\`px-4 py-2 rounded \${className}\`} {...props}>{children}</button>;\n"
        ;;
      "HiveCard")
        components_def="${components_def}const HiveCard = ({ children, className = '', ...props }: any) => <div className={\`border rounded-lg p-4 \${className}\`} {...props}>{children}</div>;\n"
        ;;
      "HiveLogo")
        components_def="${components_def}const HiveLogo = ({ size = 'default', variant = 'gradient', showText = false }: any) => <div className='flex items-center'><span className='text-xl font-bold'>HIVE</span></div>;\n"
        ;;
      "HiveInput")
        components_def="${components_def}const HiveInput = ({ className = '', ...props }: any) => <input className={\`px-3 py-2 border rounded \${className}\`} {...props} />;\n"
        ;;
      *)
        # For any other component, create a generic div wrapper
        components_def="${components_def}const ${component} = ({ children, className = '', ...props }: any) => <div className={className} {...props}>{children || '${component}'}</div>;\n"
        ;;
    esac
  done

  # Replace the import with inline components
  if [ ! -z "$components_def" ]; then
    # Create a temp file with the replacement
    local temp_file="${file}.temp"

    # Remove the @hive/ui import and add inline components
    sed "/^import.*from ['\"]@hive\/ui['\"];*$/d" "$file" > "$temp_file"

    # Find the line after the last import to insert our components
    local last_import_line=$(grep -n "^import" "$temp_file" | tail -1 | cut -d: -f1)
    if [ -z "$last_import_line" ]; then
      last_import_line=0
    fi

    # Insert the component definitions after imports
    {
      head -n "$last_import_line" "$temp_file"
      echo "// Temp fix for chunk 2073 useRef errors"
      echo -e "$components_def"
      tail -n +$((last_import_line + 1)) "$temp_file"
    } > "${file}.new"

    mv "${file}.new" "$file"
    rm "$temp_file"

    echo "  ✓ Replaced imports with inline components"
  fi
}

# Process all files
find apps/web/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "@hive/ui" {} \; | while read file; do
  # Skip node_modules and .next directories
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".next"* ]]; then
    continue
  fi

  add_inline_components "$file"
done

echo "Replacement complete!"
echo "To restore original files, run: find apps/web/src -name '*.bak.hive' | while read f; do mv \"\$f\" \"\${f%.bak.hive}\"; done"