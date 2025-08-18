# HIVE Routing & Motion Test Guide 🚀

## 🔄 **Complete User Flow Test**

### **1. Landing Page → Schools Selection**
- **URL**: `/` → redirects to `/landing`
- **Test**: Click "Get Started" button
- **Expected**: Navigate to `/schools`
- **Animation**: Button should have yellow glow hover effect
- **Motion**: HIVE liquid metal animations on page load

### **2. Schools Selection → Login**
- **URL**: `/schools`
- **Test**: Click on "University at Buffalo" (active school)
- **Expected**: Navigate to `/auth/login?schoolId=ub&schoolName=University%20at%20Buffalo&domain=buffalo.edu`
- **Animation**: School card should have emerald glow and magnetic hover
- **Motion**: Progress bars should animate smoothly

### **3. Login → Email Verification**
- **URL**: `/auth/login`
- **Test**: Enter email and click "Send magic link"
- **Expected**: Show success state with email confirmation
- **Animation**: Button should have HIVE primary button styling
- **Motion**: Form should have liquid reveal animation

### **4. Email Verification → Onboarding**
- **URL**: `/auth/verify` (from email link)
- **Test**: Click magic link in email
- **Expected**: Navigate to `/onboarding` for new users
- **Animation**: Loading spinner, then success checkmark
- **Motion**: Success state should have smooth transitions

### **5. Onboarding Wizard Navigation**
- **URL**: `/onboarding`
- **Test**: Complete all 7 steps
- **Expected**: Progress through Welcome → Name → Academics → Handle → Photo → Builder → Legal
- **Animation**: Progress bar should animate with each step
- **Motion**: Step transitions should use liquid reveal animations

### **6. Onboarding → Dashboard**
- **URL**: `/onboarding` → `/` (post-completion)
- **Test**: Complete final step and click "Enter HIVE"
- **Expected**: Navigate to dashboard with user data
- **Animation**: Final step should have celebration animations
- **Motion**: Smooth transition to dashboard

## 🎨 **Animation & Motion Consistency Check**

### **HIVE Motion System Classes:**
- ✅ `hive-animate-flow-in` - Initial page load
- ✅ `hive-animate-magnetic-entry` - Main content areas
- ✅ `hive-animate-liquid-reveal` - Forms and cards
- ✅ `hive-animate-silk-emerge` - Secondary elements
- ✅ `hive-word-cycle` - Word cycling animation

### **HIVE Button Classes:**
- ✅ `hive-button-primary` - Primary actions (Get Started, Continue)
- ✅ `hive-button-secondary` - Secondary actions (Back, Try Again)
- ✅ `hive-interactive` - Hover effects with scale and translation

### **HIVE Glass Effects:**
- ✅ `hive-glass` - Basic glass morphism
- ✅ `hive-glass-strong` - Enhanced backdrop blur
- ✅ Yellow glows around buttons and countdown
- ✅ Emerald glows for success states

## 📱 **Responsive Design Test**

### **Breakpoints to Test:**
- **Mobile**: 375px width
- **Tablet**: 768px width  
- **Desktop**: 1440px width

### **Key Elements:**
- ✅ Navigation collapses properly on mobile
- ✅ Word cycling animation works on all screen sizes
- ✅ Progress bars and buttons scale appropriately
- ✅ Onboarding wizard adapts to small screens
- ✅ Dashboard layout stacks properly on mobile

## 🔧 **Navigation Flow Verification**

### **Forward Navigation:**
```
/ → /landing → /schools → /auth/login → /auth/verify → /onboarding → /
```

### **Backward Navigation:**
- `/schools` → "Back" button → `/landing`
- `/auth/login` → "Back" button → `/schools`
- `/onboarding` → "Back" button → Previous step

### **Logo Navigation:**
- All pages: Logo click → `/`
- Maintains current auth state

## ⚡ **Performance Checklist**

### **Animation Performance:**
- ✅ All animations run at 60fps
- ✅ No janky scrolling or transitions
- ✅ CSS animations preferred over JavaScript
- ✅ Proper will-change and transform optimizations

### **Loading States:**
- ✅ Proper loading spinners during auth
- ✅ Skeleton states for dashboard content
- ✅ Smooth transitions between states

## 🎯 **Critical User Journey Test**

### **Test Scenario: New User Registration**
1. **Start**: Visit `/` (or any URL - should redirect to `/landing`)
2. **Landing**: See animated word cycling "Finally, your [campus/clubs/parties/friends]"
3. **Get Started**: Click button with yellow glow hover effect
4. **Schools**: Search and select "University at Buffalo"
5. **Login**: Enter @buffalo.edu email, see magic link confirmation
6. **Verify**: Click email link, see verification loading → success
7. **Onboarding**: Complete 7-step wizard with progress tracking
8. **Dashboard**: Land on personalized dashboard with user data

### **Expected Motion Flow:**
- **Landing**: Orchestrated entrance animations
- **Schools**: Magnetic hover effects on school cards
- **Login**: Liquid reveal form animations
- **Verify**: Smooth loading → success transitions
- **Onboarding**: Step-by-step progress with sidebar preview
- **Dashboard**: Final reveal with user personalization

## 🚀 **Final Verification Commands**

### **Build Test:**
```bash
cd /Users/laneyfraass/hive_ui
npm run build
```

### **Dev Server Test:**
```bash
npm run dev
# Test all routes manually in browser
```

### **Production Deploy Test:**
```bash
./deploy.sh
# Test complete flow in production environment
```

## ✅ **Success Criteria**

### **Routing:**
- [ ] All navigation links work correctly
- [ ] Back buttons function properly
- [ ] URL parameters passed correctly
- [ ] Auth redirects work as expected

### **Animations:**
- [ ] Landing page word cycling works smoothly
- [ ] All HIVE motion classes applied consistently
- [ ] Button hover effects with yellow glows
- [ ] Progress bars animate smoothly
- [ ] No motion artifacts or janky animations

### **Design System:**
- [ ] Consistent HIVE colors throughout
- [ ] Geist Sans typography applied everywhere
- [ ] Matte obsidian glass effects
- [ ] Proper spacing with HIVE gap classes

### **Responsive:**
- [ ] Mobile navigation works
- [ ] All animations work on small screens
- [ ] Touch interactions feel responsive
- [ ] No horizontal scrolling issues

## 🎉 **When Complete:**

All routing is properly connected with consistent HIVE motion animations throughout the entire user journey. The application provides a seamless, premium experience from landing page to dashboard with butter-smooth liquid metal transitions and proper error handling.

**Result**: Production-ready authentication and onboarding flow with world-class motion design! 🚀