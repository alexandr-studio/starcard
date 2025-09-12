# Digital Business Card - alexandr.codes

A simple, elegant digital business card built with Astro.js to solve a common problem: quickly sharing your professional information and project links with others.

## The Problem

When meeting people in person, it's often cumbersome to share:
- Your portfolio projects
- YouTube channels
- Contact details
- Social media profiles

Usually this ends up in awkward dictation sessions or typing URLs on someone else's phone.

## The Solution

A single, static HTML page that displays all your professional information with QR code functionality:

- **Mobile Experience**: Click any link → QR code slides in from the right → Others scan with their phone → QR code opens link when tapped → Close with X button or tap outside
- **Desktop Experience**: Click any link → Opens directly in new tab (no QR codes needed)
- **vCard Feature**: Special button that generates a QR code with contact information for easy saving to contacts

## Core Features

### Essential Functionality
- Single static HTML page
- Responsive design (mobile-first)
- QR code generation for sharing links on mobile
- vCard QR code for contact information
- Professional profile display

### User Experience
- **Mobile QR Popover**: Right-sliding sidebar that shows QR code, fills space as needed
- **Click/Touch QR**: Opens link in new tab
- **Close Options**: X button or tap outside to dismiss
- **Desktop**: Direct link opening (no QR codes)

### Technical Goals
- Fast loading and offline-tolerant
- Minimal JavaScript
- Clean, professional design
- Easy content management via JSON configuration

## Future Vision

Transform this into an Astro theme (similar to Astro Starlight) so anyone can:
- Fork the project
- Update their profile information
- Deploy their own digital business card in minutes

## Data Structure

All profile information is stored in `src/data/profile.json`:
- Personal information (name, title, avatar, contact)
- Organized link sections (Social, Professional, Support, Legal)
- Easy to edit and maintain

This is a focused, single-purpose tool: a digital business card that makes sharing your professional presence effortless.