# Development Plan - Digital Business Card

## Current Status

✅ **Foundation Complete**
- Astro.js project setup with TypeScript
- Profile data system with JSON configuration
- Zod validation schemas
- Basic responsive layout
- Icon system (50+ social platforms)
- Static QR code generation
- SEO optimization

## Phase 1: Core QR Functionality (Priority)

### 1.1 Mobile QR Popover System
- [ ] **QR Popover Component**: Create sliding sidebar from right
  - Right-slide animation with smooth transitions
  - Responsive sizing (fills space as needed)
  - QR code generation for any URL
  - Click QR code → open link in new tab

- [ ] **Mobile Detection & Behavior**
  - Device detection (mobile vs desktop)
  - Mobile: Show QR popover on link click
  - Desktop: Direct link opening in new tab

- [ ] **Popover Controls**
  - Close button (X icon)
  - Tap/click outside to dismiss
  - Proper focus management and accessibility

### 1.2 vCard QR Code
- [ ] **vCard Generation**: Create vCard data from profile.json
  - Name, phone, email, website, address
  - Proper vCard 3.0/4.0 format
  
- [ ] **vCard Button**: Special button that shows contact QR code
  - Distinguished from regular link QRs
  - Clear labeling ("Save Contact" or "Add to Contacts")

## Phase 2: UX Enhancements

### 2.1 Design & Interaction Polish
- [ ] **Animation Improvements**
  - Smooth slide-in/out transitions
  - Loading states for QR generation
  - Micro-interactions for better feedback

- [ ] **Visual Design**
  - QR code styling (golden ratio already implemented)
  - Consistent spacing and typography
  - Dark/light theme considerations

### 2.2 Wide Screen Optimizations  
- [ ] **Desktop Layout**: Improve wide screen presentation
  - Better section organization
  - Full URL display with proper styling
  - Optimal use of horizontal space

## Phase 3: Content & Features

### 3.1 Content Expansion
- [ ] **Icon Library**: Add missing platform icons
  - Mastodon, Bluesky, Threads
  - Platform-specific styling
  - Consistent sizing and colors

- [ ] **Profile Enhancement**
  - Additional profile fields as needed
  - Better organization of link sections

### 3.2 Technical Improvements
- [ ] **Performance Optimization**
  - Lazy loading for QR generation
  - Optimize bundle size
  - Service worker for offline capability

## Phase 4: Theme Development

### 4.1 Astro Theme Creation
- [ ] **Theme Structure**: Convert to reusable Astro theme
  - Template repository setup
  - Clear documentation
  - Easy customization system

- [ ] **Configuration System**
  - Simple config file for theme users
  - Color scheme customization
  - Layout options

### 4.2 Documentation & Publishing
- [ ] **User Documentation**
  - Setup instructions
  - Configuration guide
  - Customization examples

- [ ] **Theme Publishing**
  - NPM package creation
  - Astro theme registry submission
  - Example implementations

## Phase 5: Deployment & Distribution

### 5.1 Production Deployment
- [ ] **Domain Setup**: Deploy to alexandr.codes
  - Production build optimization
  - CDN configuration
  - SSL and security headers

### 5.2 Open Source Release
- [ ] **Repository Preparation**
  - Clean commit history
  - Comprehensive README
  - License selection
  - Contributing guidelines

## Technical Priorities

### Immediate (This Sprint)
1. **QR Popover Component** - Core mobile functionality
2. **Mobile Detection** - Different behavior for mobile/desktop  
3. **vCard QR Generation** - Contact sharing feature

### Short Term (Next 2-3 Sprints)
1. **Wide Screen Layout** - Better desktop experience
2. **Animation Polish** - Smooth, professional interactions
3. **Icon Expansion** - Complete platform coverage

### Medium Term (1-2 Months)
1. **Performance Optimization** - Fast loading, offline support
2. **Theme Development** - Reusable Astro theme
3. **Documentation** - User and developer guides

### Long Term (3+ Months)
1. **Community Features** - Theme marketplace presence
2. **Advanced Customization** - More configuration options
3. **Analytics Integration** - Optional usage insights

## Success Metrics

- **Mobile QR Flow**: Seamless link sharing via QR codes
- **Load Time**: Sub-2 second initial page load
- **Accessibility**: WCAG AA compliance
- **Theme Adoption**: 10+ community implementations
- **Bundle Size**: <50KB total JavaScript

## Notes

- Focus on mobile-first development (primary use case)
- Keep JavaScript minimal and performant
- Maintain accessibility throughout development
- Test on various devices and screen sizes
- Document decisions for theme users