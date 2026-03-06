import re
import os

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

replacements = {
    # Body and Structural
    'class="font-text text-gray-100 bg-black min-h-screen"': 'class="font-text bg-page text-main min-h-screen"',
    'bg-black/80': 'bg-header',
    'bg-black/95': 'bg-mobile-menu',
    'bg-black/50': 'bg-section',
    'bg-black/40': 'bg-section',
    'bg-black': 'bg-page',
    
    # Text colors
    'text-gray-100': 'text-main',
    'text-white': 'text-main',
    'text-gray-300': 'text-muted',
    'text-gray-400': 'text-muted',
    'text-gray-500': 'text-muted',
    
    # Primary colors
    'amber-500': 'primary',
    'bg-amber-500': 'bg-primary',
    'text-amber-500': 'text-primary',
    
    # Borders
    'border-gray-800': 'border-main',
    'border-gray-700': 'border-main',
    'border-gray-600': 'border-main',
    'border-gray-500': 'border-main',
    'border-black': 'border-page',
    
    # Cards / Elements
    'bg-gray-900/50': 'bg-card',
    'bg-gray-800': 'bg-card-alt',
    'bg-gray-600': 'bg-card-alt',
    'bg-white/5': 'bg-card',
    'bg-white/10': 'bg-card-alt',
    
    # Shadows
    'shadow-[0_0_15px_rgba(245,158,11,0.5)]': 'shadow-primary',
    'shadow-[0_0_20px_rgba(245,158,11,0.3)]': 'shadow-primary',
    'shadow-[0_0_0_rgba(245,158,11,0)]': '', # redundant initially
}

for old, new in replacements.items():
    html = html.replace(old, new)
    # Also handle some regex if necessary

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
