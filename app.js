// DevForge — Client-Side Developer Tools Suite
// 100% Client-Side Engine (Zero Server Dependencies)

// --- Navigation Tabs ---
function switchTab(tabId) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');

  const navItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (navItem) navItem.classList.add('active');

  if (tabId === 'mesh-gradient') {
    renderMesh();
  } else if (tabId === 'custom-gradient') {
    renderCustomGradient();
  }
}

// ==========================================
// 1. Xcode AppIcon Studio
// ==========================================
let sourceImage = null;
const appleIconSpecs = [
  { name: "icon_1024x1024.png", size: 1024, idiom: "universal", platform: "ios", role: "app-store" },
  { name: "icon_180x180.png", size: 180, idiom: "iphone", scale: "3x", pointSize: 60 },
  { name: "icon_120x120.png", size: 120, idiom: "iphone", scale: "2x", pointSize: 60 },
  { name: "icon_87x87.png", size: 87, idiom: "iphone", scale: "3x", pointSize: 29 },
  { name: "icon_80x80.png", size: 80, idiom: "iphone", scale: "2x", pointSize: 40 },
  { name: "icon_58x58.png", size: 58, idiom: "iphone", scale: "2x", pointSize: 29 },
  { name: "icon_167x167.png", size: 167, idiom: "ipad", scale: "2x", pointSize: 83.5 },
  { name: "icon_152x152.png", size: 152, idiom: "ipad", scale: "2x", pointSize: 76 },
  { name: "icon_76x76.png", size: 76, idiom: "ipad", scale: "1x", pointSize: 76 },
  { name: "icon_40x40.png", size: 40, idiom: "ipad", scale: "2x", pointSize: 20 },
  { name: "icon_29x29.png", size: 29, idiom: "ipad", scale: "1x", pointSize: 29 },
  { name: "icon_20x20.png", size: 20, idiom: "ipad", scale: "1x", pointSize: 20 },
  { name: "icon_mac_512@2x.png", size: 1024, idiom: "mac", scale: "2x", pointSize: 512 },
  { name: "icon_mac_512@1x.png", size: 512, idiom: "mac", scale: "1x", pointSize: 512 },
  { name: "icon_mac_256@2x.png", size: 512, idiom: "mac", scale: "2x", pointSize: 256 },
  { name: "icon_mac_256@1x.png", size: 256, idiom: "mac", scale: "1x", pointSize: 256 },
  { name: "icon_mac_128@2x.png", size: 256, idiom: "mac", scale: "2x", pointSize: 128 },
  { name: "icon_mac_128@1x.png", size: 128, idiom: "mac", scale: "1x", pointSize: 128 },
  { name: "icon_mac_32@2x.png", size: 64, idiom: "mac", scale: "2x", pointSize: 32 },
  { name: "icon_mac_32@1x.png", size: 32, idiom: "mac", scale: "1x", pointSize: 32 },
  { name: "icon_mac_16@2x.png", size: 32, idiom: "mac", scale: "2x", pointSize: 16 },
  { name: "icon_mac_16@1x.png", size: 16, idiom: "mac", scale: "1x", pointSize: 16 }
];

function setupDropzone() {
  const dropzone = document.getElementById('iconDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processIconFile(file);
    }
  });
}

function handleIconUpload(e) {
  const file = e.target.files[0];
  if (file) processIconFile(file);
}

function loadSampleIcon() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle circular ambient glow
  const radial = ctx.createRadialGradient(512, 512, 50, 512, 512, 480);
  radial.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
  radial.addColorStop(0.7, 'rgba(139, 92, 246, 0.15)');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer border ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 16;
  ctx.strokeRect(32, 32, 960, 960);

  // Central Hero Glyph: Glowing Lightning Bolt
  ctx.save();
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 60;
  ctx.fillStyle = '#ffffff';

  ctx.beginPath();
  ctx.moveTo(560, 160);
  ctx.lineTo(340, 520);
  ctx.lineTo(500, 520);
  ctx.lineTo(440, 864);
  ctx.lineTo(700, 460);
  ctx.lineTo(540, 460);
  ctx.closePath();

  const boltGrad = ctx.createLinearGradient(340, 160, 700, 864);
  boltGrad.addColorStop(0, '#ffffff');
  boltGrad.addColorStop(0.4, '#38bdf8');
  boltGrad.addColorStop(1, '#6366f1');
  ctx.fillStyle = boltGrad;
  ctx.fill();
  ctx.restore();

  // Glass Specular Sheen (diagonal overlay)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1024, 0);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.fill();
  ctx.restore();

  const img = new Image();
  img.onload = () => {
    sourceImage = img;
    document.getElementById('dropzonePrompt').style.display = 'none';
    const previewStage = document.getElementById('previewStage');
    previewStage.style.display = 'flex';
    const previewImg = document.getElementById('sourceIconPreview');
    previewImg.src = img.src;
    document.getElementById('sourceIconSpecs').textContent = `1024 × 1024 PNG (Demo Asset)`;
    document.getElementById('iconActionBar').style.display = 'flex';
    renderIconGrid();
  };
  img.src = canvas.toDataURL('image/png');
}

function processIconFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      sourceImage = img;
      document.getElementById('dropzonePrompt').style.display = 'none';
      const previewStage = document.getElementById('previewStage');
      previewStage.style.display = 'flex';
      const previewImg = document.getElementById('sourceIconPreview');
      previewImg.src = e.target.result;
      document.getElementById('sourceIconSpecs').textContent = `${img.width} × ${img.height} PNG`;
      document.getElementById('iconActionBar').style.display = 'flex';
      renderIconGrid();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderIconGrid() {
  const grid = document.getElementById('generatedIconsGrid');
  grid.style.display = 'grid';
  grid.innerHTML = '';

  const displayPresets = [
    { label: "App Store / Universal", size: 1024, px: 1024 },
    { label: "iPhone App Icon (@3x)", size: 180, px: 180 },
    { label: "iPhone App Icon (@2x)", size: 120, px: 120 },
    { label: "iPad Pro App Icon", size: 167, px: 167 },
    { label: "macOS Dock (@2x)", size: 512, px: 512 },
    { label: "Spotlight / Search", size: 80, px: 80 },
    { label: "Settings Icon", size: 58, px: 58 },
    { label: "Notification Icon", size: 40, px: 40 }
  ];

  displayPresets.forEach(preset => {
    const canvas = document.createElement('canvas');
    canvas.width = preset.px;
    canvas.height = preset.px;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0, preset.px, preset.px);

    const card = document.createElement('div');
    card.className = 'icon-card';
    card.innerHTML = `
      <img src="${canvas.toDataURL('image/png')}" class="icon-thumb" alt="${preset.label}">
      <span class="icon-card-title">${preset.label}</span>
      <span class="icon-card-dim">${preset.px}×${preset.px} px</span>
    `;
    grid.appendChild(card);
  });
}

function resetIconDropzone() {
  sourceImage = null;
  const prompt = document.getElementById('dropzonePrompt');
  prompt.style.display = 'flex';
  prompt.style.flexDirection = 'column';
  document.getElementById('previewStage').style.display = 'none';
  document.getElementById('iconActionBar').style.display = 'none';
  document.getElementById('generatedIconsGrid').style.display = 'none';
  document.getElementById('iconInput').value = '';
}

async function exportAppIconZip() {
  if (!sourceImage) return;
  if (typeof JSZip === 'undefined') {
    alert("JSZip is loading, please try again in a moment.");
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder("AppIcon.appiconset");

  // Generate all PNG files
  const contentsImages = [];

  for (const spec of appleIconSpecs) {
    const canvas = document.createElement('canvas');
    canvas.width = spec.size;
    canvas.height = spec.size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0, spec.size, spec.size);

    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    folder.file(spec.name, base64Data, { base64: true });

    const item = {
      filename: spec.name,
      idiom: spec.idiom,
      platform: spec.platform || undefined,
      scale: spec.scale || "1x",
      size: `${spec.pointSize || spec.size}x${spec.pointSize || spec.size}`
    };
    contentsImages.push(item);
  }

  // Create standard Xcode Contents.json
  const contentsJson = {
    images: contentsImages,
    info: {
      author: "xcode",
      version: 1
    }
  };
  folder.file("Contents.json", JSON.stringify(contentsJson, null, 2));

  // Build and trigger download
  const blob = await zip.generateAsync({ type: "blob" });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = "AppIcon.appiconset.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

// ==========================================
// 2. Custom Gradient Studio Pro
// ==========================================
let gradState = {
  type: 'linear', // 'linear' | 'radial' | 'conic'
  angle: 135,
  noise: false,
  previewMode: 'card',
  exportFormat: 'css',
  stops: [
    { color: '#6366f1', position: 0 },
    { color: '#a855f7', position: 50 },
    { color: '#ec4899', position: 100 }
  ]
};

const GRADIENT_PRESETS = [
  { name: 'Sunset Flare', type: 'linear', angle: 135, stops: [{ color: '#f43f5e', position: 0 }, { color: '#fb923c', position: 50 }, { color: '#facc15', position: 100 }] },
  { name: 'Cyber Neon', type: 'linear', angle: 135, stops: [{ color: '#06b6d4', position: 0 }, { color: '#3b82f6', position: 50 }, { color: '#ec4899', position: 100 }] },
  { name: 'Hyper Aurora', type: 'linear', angle: 120, stops: [{ color: '#10b981', position: 0 }, { color: '#06b6d4', position: 50 }, { color: '#6366f1', position: 100 }] },
  { name: 'Velvet Lavender', type: 'linear', angle: 135, stops: [{ color: '#4f46e5', position: 0 }, { color: '#7c3aed', position: 50 }, { color: '#c084fc', position: 100 }] },
  { name: 'Cosmic Dark', type: 'linear', angle: 180, stops: [{ color: '#0f172a', position: 0 }, { color: '#312e81', position: 50 }, { color: '#581c87', position: 100 }] },
  { name: 'Emerald Glow', type: 'linear', angle: 90, stops: [{ color: '#059669', position: 0 }, { color: '#10b981', position: 50 }, { color: '#34d399', position: 100 }] },
  { name: 'Miami Vice', type: 'linear', angle: 45, stops: [{ color: '#f43f5e', position: 0 }, { color: '#d946ef', position: 50 }, { color: '#8b5cf6', position: 100 }] },
  { name: 'Solar Flare', type: 'linear', angle: 135, stops: [{ color: '#ea580c', position: 0 }, { color: '#f97316', position: 50 }, { color: '#fde047', position: 100 }] },
  { name: 'Titanium Void', type: 'linear', angle: 180, stops: [{ color: '#18181b', position: 0 }, { color: '#27272a', position: 50 }, { color: '#3f3f46', position: 100 }] },
  { name: 'Oceanic Abyss', type: 'linear', angle: 135, stops: [{ color: '#0369a1', position: 0 }, { color: '#0284c7', position: 50 }, { color: '#38bdf8', position: 100 }] },
  { name: 'Rose Quartz', type: 'radial', angle: 0, stops: [{ color: '#fda4af', position: 0 }, { color: '#f43f5e', position: 60 }, { color: '#9f1239', position: 100 }] },
  { name: 'Twilight Dream', type: 'conic', angle: 0, stops: [{ color: '#6366f1', position: 0 }, { color: '#ec4899', position: 33 }, { color: '#f59e0b', position: 66 }, { color: '#6366f1', position: 100 }] }
];

function initCustomGradient() {
  renderPresetsGrid();
  renderStopsList();
  renderCustomGradient();
}

function getCssGradientString(state = gradState) {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  if (state.type === 'linear') {
    return `linear-gradient(${state.angle}deg, ${stopStr})`;
  } else if (state.type === 'radial') {
    return `radial-gradient(circle at center, ${stopStr})`;
  } else if (state.type === 'conic') {
    return `conic-gradient(from ${state.angle}deg at 50% 50%, ${stopStr})`;
  }
  return `linear-gradient(135deg, ${stopStr})`;
}

function renderCustomGradient() {
  const cssGrad = getCssGradientString();

  // 1. Surface stage
  const surface = document.getElementById('gradStageSurface');
  if (surface) surface.style.background = cssGrad;

  // 2. Stop bar preview
  const stopBar = document.getElementById('gradStopsBar');
  if (stopBar) {
    const sortedStops = [...gradState.stops].sort((a, b) => a.position - b.position);
    stopBar.style.background = `linear-gradient(to right, ${sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')})`;
  }

  // 3. Mockup targets
  const phoneScreen = document.getElementById('phoneScreenGrad');
  if (phoneScreen) phoneScreen.style.background = cssGrad;

  const textTarget = document.getElementById('gradientTextTarget');
  if (textTarget) {
    textTarget.style.background = cssGrad;
    textTarget.style.webkitBackgroundClip = 'text';
    textTarget.style.webkitTextFillColor = 'transparent';
  }

  const btnTarget = document.getElementById('gradientButtonTarget');
  if (btnTarget) btnTarget.style.background = cssGrad;

  // 4. Update code snippet
  updateGradientCodeOutput();
}

function setGradientType(type) {
  gradState.type = type;
  document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`type${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (activeBtn) activeBtn.classList.add('active');

  const linearControls = document.getElementById('linearAngleControls');
  if (linearControls) {
    linearControls.style.display = (type === 'linear' || type === 'conic') ? 'block' : 'none';
  }

  renderCustomGradient();
}

function setGradientAngle(deg) {
  gradState.angle = parseInt(deg, 10);
  const slider = document.getElementById('gradAngleSlider');
  if (slider) slider.value = gradState.angle;
  const display = document.getElementById('angleDisplay');
  if (display) display.textContent = `${gradState.angle}°`;
  renderCustomGradient();
}

function setGradientPreviewMode(mode) {
  gradState.previewMode = mode;
  document.querySelectorAll('.preview-mode-btn').forEach(b => b.classList.remove('active'));
  const btn = Array.from(document.querySelectorAll('.preview-mode-btn')).find(b => b.textContent.toLowerCase().includes(mode.toLowerCase()));
  if (btn) btn.classList.add('active');

  const cardMockup = document.getElementById('previewCardMockup');
  const phoneMockup = document.getElementById('previewPhoneMockup');
  const textMockup = document.getElementById('previewTextMockup');
  const btnMockup = document.getElementById('previewButtonMockup');
  const surface = document.getElementById('gradStageSurface');

  if (cardMockup) cardMockup.style.display = (mode === 'card') ? 'flex' : 'none';
  if (phoneMockup) phoneMockup.style.display = (mode === 'phone') ? 'block' : 'none';
  if (textMockup) textMockup.style.display = (mode === 'text') ? 'block' : 'none';
  if (btnMockup) btnMockup.style.display = (mode === 'button') ? 'block' : 'none';

  if (surface) {
    surface.style.display = (mode === 'phone' || mode === 'text' || mode === 'button') ? 'none' : 'block';
  }
}

function toggleGradientNoise(enabled) {
  gradState.noise = enabled;
  const overlay = document.getElementById('gradNoiseOverlay');
  if (overlay) overlay.style.display = enabled ? 'block' : 'none';
}

function renderStopsList() {
  const container = document.getElementById('stopsListContainer');
  if (!container) return;
  container.innerHTML = '';

  gradState.stops.forEach((stop, idx) => {
    const row = document.createElement('div');
    row.className = 'stop-row';

    row.innerHTML = `
      <input type="color" class="stop-color-input" value="${stop.color}" onchange="updateStopColor(${idx}, this.value)">
      <input type="text" class="stop-hex-text" value="${stop.color}" onchange="updateStopColor(${idx}, this.value)">
      <input type="range" class="stop-position-slider" min="0" max="100" value="${stop.position}" oninput="updateStopPosition(${idx}, this.value)">
      <span class="stop-pos-label">${stop.position}%</span>
      ${gradState.stops.length > 2 ? `<button class="btn-remove-stop" onclick="removeGradientStop(${idx})">✕</button>` : ''}
    `;
    container.appendChild(row);
  });
}

function updateStopColor(idx, color) {
  if (gradState.stops[idx]) {
    gradState.stops[idx].color = color;
    renderStopsList();
    renderCustomGradient();
  }
}

function updateStopPosition(idx, pos) {
  if (gradState.stops[idx]) {
    gradState.stops[idx].position = parseInt(pos, 10);
    const labels = document.querySelectorAll('.stop-pos-label');
    if (labels[idx]) labels[idx].textContent = `${pos}%`;
    renderCustomGradient();
  }
}

function addGradientStop() {
  if (gradState.stops.length >= 7) {
    showToast("Maximum 7 color stops reached.");
    return;
  }
  const lastStop = gradState.stops[gradState.stops.length - 1];
  const newPos = Math.min(100, (lastStop ? lastStop.position : 50) + 15);
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  gradState.stops.push({ color: randomColor, position: newPos });
  renderStopsList();
  renderCustomGradient();
}

function removeGradientStop(idx) {
  if (gradState.stops.length <= 2) {
    showToast("Minimum 2 color stops required.");
    return;
  }
  gradState.stops.splice(idx, 1);
  renderStopsList();
  renderCustomGradient();
}

function renderPresetsGrid() {
  const container = document.getElementById('presetsGridContainer');
  if (!container) return;
  container.innerHTML = '';

  GRADIENT_PRESETS.forEach((preset, idx) => {
    const chip = document.createElement('div');
    chip.className = 'preset-chip';
    chip.style.background = getCssGradientString(preset);
    chip.onclick = () => loadGradientPreset(idx);

    const label = document.createElement('span');
    label.className = 'preset-chip-label';
    label.textContent = preset.name;
    chip.appendChild(label);

    container.appendChild(chip);
  });
}

function loadGradientPreset(idx) {
  const preset = GRADIENT_PRESETS[idx];
  if (!preset) return;
  gradState.type = preset.type;
  gradState.angle = preset.angle;
  gradState.stops = JSON.parse(JSON.stringify(preset.stops));

  setGradientType(preset.type);
  setGradientAngle(preset.angle);
  renderStopsList();
  renderCustomGradient();
  showToast(`Loaded preset: ${preset.name}`);
}

function randomizeGradient() {
  const vibrantColors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#f97316'];
  const count = 3;
  const picked = [];
  for (let i = 0; i < count; i++) {
    const color = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    picked.push(color);
  }
  gradState.stops = [
    { color: picked[0], position: 0 },
    { color: picked[1], position: 50 },
    { color: picked[2], position: 100 }
  ];
  gradState.angle = Math.floor(Math.random() * 8) * 45;
  setGradientAngle(gradState.angle);
  renderStopsList();
  renderCustomGradient();
  showToast("Generated fresh harmonic palette! 🎨");
}

function setExportFormat(format) {
  gradState.exportFormat = format;
  document.querySelectorAll('.code-tab-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById(`tabBtn${format.charAt(0).toUpperCase() + format.slice(1)}`);
  if (btn) btn.classList.add('active');
  updateGradientCodeOutput();
}

function updateGradientCodeOutput() {
  const codeEl = document.getElementById('gradCodeOutput');
  if (!codeEl) return;
  const format = gradState.exportFormat;
  const sortedStops = [...gradState.stops].sort((a, b) => a.position - b.position);

  let snippet = '';
  if (format === 'css') {
    snippet = `/* Modern CSS Gradient */
background: ${getCssGradientString()};`;
  } else if (format === 'swiftui') {
    const swiftColors = sortedStops.map(s => {
      const rgb = hexToRgb(s.color);
      return `    .init(color: Color(red: ${(rgb.r/255).toFixed(2)}, green: ${(rgb.g/255).toFixed(2)}, blue: ${(rgb.b/255).toFixed(2)}), location: ${(s.position/100).toFixed(2)})`;
    }).join(',\n');

    if (gradState.type === 'linear') {
      snippet = `// SwiftUI 6 LinearGradient
LinearGradient(
    stops: [
${swiftColors}
    ],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)`;
    } else if (gradState.type === 'radial') {
      snippet = `// SwiftUI 6 RadialGradient
RadialGradient(
    stops: [
${swiftColors}
    ],
    center: .center,
    startRadius: 5,
    endRadius: 200
)`;
    } else {
      snippet = `// SwiftUI 6 AngularGradient
AngularGradient(
    stops: [
${swiftColors}
    ],
    center: .center,
    startAngle: .degrees(${gradState.angle}),
    endAngle: .degrees(${gradState.angle + 360})
)`;
    }
  } else if (format === 'tailwind') {
    const colors = sortedStops.map(s => s.color);
    if (colors.length === 2) {
      snippet = `<!-- Tailwind CSS Arbitrary Gradient -->
<div class="bg-gradient-to-br from-[${colors[0]}] to-[${colors[1]}]"></div>`;
    } else {
      snippet = `<!-- Tailwind CSS Arbitrary Gradient -->
<div class="bg-gradient-to-br from-[${colors[0]}] via-[${colors[1]}] to-[${colors[colors.length - 1]}]"></div>`;
    }
  } else if (format === 'flutter') {
    const flutterColors = sortedStops.map(s => {
      const hex = s.color.replace('#', '');
      return `Color(0xFF${hex.toUpperCase()})`;
    }).join(', ');
    const flutterStops = sortedStops.map(s => (s.position / 100).toFixed(2)).join(', ');
    snippet = `// Flutter Decoration
BoxDecoration(
  gradient: LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [${flutterColors}],
    stops: [${flutterStops}],
  ),
)`;
  } else if (format === 'svg') {
    const svgStops = sortedStops.map(s => `  <stop offset="${s.position}%" stop-color="${s.color}" />`).join('\n');
    snippet = `<svg width="100%" height="100%">
  <defs>
    <linearGradient id="customGrad" x1="0%" y1="0%" x2="100%" y2="100%">
${svgStops}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#customGrad)" />
</svg>`;
  }

  codeEl.innerHTML = `<code>${escapeHtml(snippet)}</code>`;
}

function copyGradientCode() {
  const codeEl = document.getElementById('gradCodeOutput');
  if (!codeEl) return;
  const text = codeEl.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied gradient code to clipboard! 📋");
  });
}

// ==========================================
// 2. JSON -> Swift Codable & TypeScript
// ==========================================
let currentLang = 'swift';

function toggleLang(lang) {
  currentLang = lang;
  document.getElementById('btnSwift').classList.toggle('active', lang === 'swift');
  document.getElementById('btnTs').classList.toggle('active', lang === 'ts');
  convertJson();
}

function loadSampleJson() {
  const sample = {
    id: "usr_99812",
    display_name: "Lewis Hamilton",
    car_number: 44,
    team: "Scuderia Ferrari",
    is_active: true,
    championship_points: 382.5,
    telemetry: {
      top_speed_kph: 351.2,
      gear: 8,
      drs_enabled: true
    },
    podiums_2026: [
      { circuit: "Monza", position: 1, fastest_lap: true },
      { circuit: "Silverstone", position: 2, fastest_lap: false }
    ],
    last_pit_stop: "2026-10-11T14:32:00Z"
  };
  document.getElementById('jsonInputText').value = JSON.stringify(sample, null, 2);
  convertJson();
}

function convertJson() {
  const input = document.getElementById('jsonInputText').value.trim();
  const outputEl = document.getElementById('codeOutput');
  if (!input) {
    outputEl.innerHTML = `<code>// Paste JSON on the left to generate model...</code>`;
    return;
  }

  try {
    const parsed = JSON.parse(input);
    if (currentLang === 'swift') {
      const code = generateSwiftStructs(parsed, "RootModel");
      outputEl.innerHTML = `<code>${escapeHtml(code)}</code>`;
    } else {
      const code = generateTsInterfaces(parsed, "RootModel");
      outputEl.innerHTML = `<code>${escapeHtml(code)}</code>`;
    }
  } catch (err) {
    outputEl.innerHTML = `<code style="color: #ff6b6b;">// JSON Parse Error:\n${escapeHtml(err.message)}</code>`;
  }
}

function toPascalCase(str) {
  return str.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function generateSwiftStructs(data, rootName) {
  const structs = [];

  function parseObject(obj, name) {
    const fields = [];
    const codingKeys = [];
    let needsCodingKeys = false;

    for (const [key, val] of Object.entries(obj)) {
      const camelKey = toCamelCase(key);
      if (camelKey !== key) needsCodingKeys = true;

      let swiftType = "String";
      if (val === null) {
        swiftType = "String?";
      } else if (typeof val === 'boolean') {
        swiftType = "Bool";
      } else if (typeof val === 'number') {
        swiftType = Number.isInteger(val) ? "Int" : "Double";
      } else if (typeof val === 'string') {
        swiftType = "String";
      } else if (Array.isArray(val)) {
        if (val.length === 0) {
          swiftType = "[String]";
        } else if (typeof val[0] === 'object' && val[0] !== null) {
          const childName = toPascalCase(key.replace(/s$/, '')) + "Item";
          parseObject(val[0], childName);
          swiftType = `[${childName}]`;
        } else {
          swiftType = `[${typeof val[0] === 'number' ? 'Double' : 'String'}]`;
        }
      } else if (typeof val === 'object') {
        const childName = toPascalCase(key);
        parseObject(val, childName);
        swiftType = childName;
      }

      fields.push(`    public let ${camelKey}: ${swiftType}`);
      codingKeys.push(`        case ${camelKey} = "${key}"`);
    }

    let structCode = `public struct ${name}: Codable, Sendable, Identifiable {\n`;
    if (fields.some(f => f.includes('id:'))) {
      // already has id
    } else {
      // no id, keep as Codable, Sendable
      structCode = `public struct ${name}: Codable, Sendable {\n`;
    }
    structCode += fields.join('\n');

    if (needsCodingKeys) {
      structCode += `\n\n    enum CodingKeys: String, CodingKey {\n`;
      structCode += codingKeys.join('\n');
      structCode += `\n    }`;
    }
    structCode += `\n}`;
    structs.unshift(structCode);
  }

  if (Array.isArray(data)) {
    parseObject(data[0] || {}, `${rootName}Item`);
  } else {
    parseObject(data, rootName);
  }

  return `import Foundation\n\n` + structs.join('\n\n');
}

function generateTsInterfaces(data, rootName) {
  const interfaces = [];

  function parseObject(obj, name) {
    const fields = [];
    for (const [key, val] of Object.entries(obj)) {
      let tsType = "string";
      if (val === null) {
        tsType = "string | null";
      } else if (typeof val === 'boolean') {
        tsType = "boolean";
      } else if (typeof val === 'number') {
        tsType = "number";
      } else if (typeof val === 'string') {
        tsType = "string";
      } else if (Array.isArray(val)) {
        if (val.length === 0) {
          tsType = "any[]";
        } else if (typeof val[0] === 'object' && val[0] !== null) {
          const childName = toPascalCase(key.replace(/s$/, '')) + "Item";
          parseObject(val[0], childName);
          tsType = `${childName}[]`;
        } else {
          tsType = `${typeof val[0]}[]`;
        }
      } else if (typeof val === 'object') {
        const childName = toPascalCase(key);
        parseObject(val, childName);
        tsType = childName;
      }
      fields.push(`  ${key}: ${tsType};`);
    }
    const interfaceCode = `export interface ${name} {\n${fields.join('\n')}\n}`;
    interfaces.unshift(interfaceCode);
  }

  if (Array.isArray(data)) {
    parseObject(data[0] || {}, `${rootName}Item`);
  } else {
    parseObject(data, rootName);
  }

  return interfaces.join('\n\n');
}

function copyCode() {
  const text = document.getElementById('codeOutput').innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  });
}

// ==========================================
// 3. SwiftUI Mesh Gradient Lab
// ==========================================
const meshState = {
  width: 3,
  height: 3,
  points: [
    { x: 0.0, y: 0.0, color: "#4f46e5" }, { x: 0.5, y: 0.0, color: "#06b6d4" }, { x: 1.0, y: 0.0, color: "#10b981" },
    { x: 0.0, y: 0.5, color: "#9333ea" }, { x: 0.5, y: 0.5, color: "#f43f5e" }, { x: 1.0, y: 0.5, color: "#f59e0b" },
    { x: 0.0, y: 1.0, color: "#3b82f6" }, { x: 0.5, y: 1.0, color: "#ec4899" }, { x: 1.0, y: 1.0, color: "#8b5cf6" }
  ]
};

let activeDragPoint = null;

function initMesh() {
  const overlay = document.getElementById('meshPointsOverlay');
  if (!overlay) return;
  overlay.innerHTML = '';

  meshState.points.forEach((pt, idx) => {
    const handle = document.createElement('div');
    handle.className = 'mesh-handle';
    handle.style.left = `${pt.x * 100}%`;
    handle.style.top = `${pt.y * 100}%`;
    handle.style.backgroundColor = pt.color;
    handle.title = `Point ${idx}: (${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`;

    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      activeDragPoint = idx;
    });

    overlay.appendChild(handle);
  });

  renderMesh();
}

function setupMeshDrag() {
  const wrap = document.querySelector('.mesh-canvas-wrap');
  if (!wrap) return;

  wrap.addEventListener('mousemove', (e) => {
    if (activeDragPoint === null) return;
    const rect = wrap.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    meshState.points[activeDragPoint].x = x;
    meshState.points[activeDragPoint].y = y;

    const handles = document.querySelectorAll('.mesh-handle');
    if (handles[activeDragPoint]) {
      handles[activeDragPoint].style.left = `${x * 100}%`;
      handles[activeDragPoint].style.top = `${y * 100}%`;
    }

    renderMesh();
  });

  window.addEventListener('mouseup', () => {
    activeDragPoint = null;
  });
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function renderMesh() {
  const canvas = document.getElementById('meshCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Render smooth bicubic/bilinear gradient mesh approximation
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  const pts = meshState.points;
  const pColors = pts.map(p => hexToRgb(p.color));

  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;

      // Inverse distance weighting between control points
      let rSum = 0, gSum = 0, bSum = 0, wSum = 0;

      for (let i = 0; i < pts.length; i++) {
        const dx = u - pts[i].x;
        const dy = v - pts[i].y;
        const distSq = dx * dx + dy * dy + 0.0001;
        const weight = 1 / (distSq * distSq);

        rSum += pColors[i].r * weight;
        gSum += pColors[i].g * weight;
        bSum += pColors[i].b * weight;
        wSum += weight;
      }

      const pixelIdx = (y * w + x) * 4;
      data[pixelIdx] = Math.round(rSum / wSum);
      data[pixelIdx + 1] = Math.round(gSum / wSum);
      data[pixelIdx + 2] = Math.round(bSum / wSum);
      data[pixelIdx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  updateMeshCodeOutput();
}

function updateMeshCodeOutput() {
  const pointsCode = meshState.points
    .map(p => `        SIMD2<Float>(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`)
    .join(',\n');

  const colorsCode = meshState.points
    .map(p => `        Color(hex: "${p.color}")`)
    .join(',\n');

  const swiftUiCode = `import SwiftUI

struct CustomMeshView: View {
    var body: some View {
        MeshGradient(
            width: 3,
            height: 3,
            points: [
${pointsCode}
            ],
            colors: [
${colorsCode}
            ],
            smoothsColors: true
        )
        .ignoresSafeArea()
    }
}`;

  const outputEl = document.getElementById('meshCodeOutput');
  if (outputEl) outputEl.innerHTML = `<code>${escapeHtml(swiftUiCode)}</code>`;
}

function loadMeshPreset(preset) {
  const palettes = {
    aurora: ["#052e16", "#047857", "#10b981", "#064e3b", "#065f46", "#34d399", "#022c22", "#0f766e", "#2dd4bf"],
    sunset: ["#4c0519", "#be123c", "#f43f5e", "#7c2d12", "#c2410c", "#fb923c", "#701a75", "#a21caf", "#f472b6"],
    neon: ["#0f172a", "#06b6d4", "#3b82f6", "#6b21a8", "#d946ef", "#ec4899", "#1e1b4b", "#6366f1", "#0284c7"],
    monochrome: ["#020617", "#0f172a", "#1e293b", "#334155", "#475569", "#64748b", "#090d16", "#1e293b", "#94a3b8"]
  };

  const colors = palettes[preset] || palettes.aurora;
  meshState.points.forEach((pt, i) => {
    pt.color = colors[i % colors.length];
  });

  initMesh();
}

function copyMeshCode() {
  const code = document.getElementById('meshCodeOutput').innerText;
  navigator.clipboard.writeText(code).then(() => showToast("SwiftUI MeshGradient code copied!"));
}

// ==========================================
// 4. SVG -> SwiftUI Path
// ==========================================
function loadSampleSvg() {
  const starSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 10 L 61 38 L 91 38 L 67 56 L 76 84 L 50 67 L 24 84 L 33 56 L 9 38 L 39 38 Z" fill="#ffd700"/>
</svg>`;
  document.getElementById('svgInputText').value = starSvg;
  convertSvg();
}

function convertSvg() {
  const input = document.getElementById('svgInputText').value.trim();
  const outputEl = document.getElementById('svgOutput');
  if (!input) {
    outputEl.innerHTML = `<code>// Paste SVG on the left...</code>`;
    return;
  }

  // Extract path d attribute
  let pathD = input;
  const match = input.match(/d\s*=\s*["']([^"']+)["']/i);
  if (match) pathD = match[1];

  const swiftCommands = parseSvgPathToSwift(pathD);
  const swiftCode = `import SwiftUI

struct CustomVectorShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        
${swiftCommands.map(c => '        ' + c).join('\n')}
        
        return path
    }
}`;

  outputEl.innerHTML = `<code>${escapeHtml(swiftCode)}</code>`;
}

function parseSvgPathToSwift(d) {
  const commands = [];
  const tokens = d.match(/([a-df-z]|[-+]?[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?)/gi) || [];

  let i = 0;
  let curX = 0, curY = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[a-z]$/i.test(token)) {
      const cmd = token;
      i++;

      if (cmd === 'M' || cmd === 'm') {
        const x = parseFloat(tokens[i++]);
        const y = parseFloat(tokens[i++]);
        curX = cmd === 'M' ? x : curX + x;
        curY = cmd === 'M' ? y : curY + y;
        commands.push(`path.move(to: CGPoint(x: ${curX.toFixed(1)}, y: ${curY.toFixed(1)}))`);
      } else if (cmd === 'L' || cmd === 'l') {
        const x = parseFloat(tokens[i++]);
        const y = parseFloat(tokens[i++]);
        curX = cmd === 'L' ? x : curX + x;
        curY = cmd === 'L' ? y : curY + y;
        commands.push(`path.addLine(to: CGPoint(x: ${curX.toFixed(1)}, y: ${curY.toFixed(1)}))`);
      } else if (cmd === 'H' || cmd === 'h') {
        const x = parseFloat(tokens[i++]);
        curX = cmd === 'H' ? x : curX + x;
        commands.push(`path.addLine(to: CGPoint(x: ${curX.toFixed(1)}, y: ${curY.toFixed(1)}))`);
      } else if (cmd === 'V' || cmd === 'v') {
        const y = parseFloat(tokens[i++]);
        curY = cmd === 'V' ? y : curY + y;
        commands.push(`path.addLine(to: CGPoint(x: ${curX.toFixed(1)}, y: ${curY.toFixed(1)}))`);
      } else if (cmd === 'C' || cmd === 'c') {
        const cp1x = parseFloat(tokens[i++]);
        const cp1y = parseFloat(tokens[i++]);
        const cp2x = parseFloat(tokens[i++]);
        const cp2y = parseFloat(tokens[i++]);
        const x = parseFloat(tokens[i++]);
        const y = parseFloat(tokens[i++]);
        const endX = cmd === 'C' ? x : curX + x;
        const endY = cmd === 'C' ? y : curY + y;
        commands.push(`path.addCurve(to: CGPoint(x: ${endX.toFixed(1)}, y: ${endY.toFixed(1)}), control1: CGPoint(x: ${cp1x.toFixed(1)}, y: ${cp1y.toFixed(1)}), control2: CGPoint(x: ${cp2x.toFixed(1)}, y: ${cp2y.toFixed(1)}))`);
        curX = endX;
        curY = endY;
      } else if (cmd === 'Z' || cmd === 'z') {
        commands.push(`path.closeSubpath()`);
      }
    } else {
      i++;
    }
  }

  return commands.length > 0 ? commands : ["// Could not parse path coordinates"];
}

function copySvgCode() {
  const code = document.getElementById('svgOutput').innerText;
  navigator.clipboard.writeText(code).then(() => showToast("SwiftUI Path code copied!"));
}

// ==========================================
// 5. 8-Bit Sound FX Synthesizer
// ==========================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function updateSfxParam() {
  const freq = document.getElementById('paramFreq').value;
  const decay = document.getElementById('paramDecay').value;
  document.getElementById('valFreq').textContent = freq;
  document.getElementById('valDecay').textContent = decay;
}

function playSfx(preset) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  if (preset === 'laser') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (preset === 'jump') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (preset === 'coin') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (preset === 'explosion') {
    // White noise explosion
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(50, now + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.4);
  } else if (preset === 'powerup') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
    });
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

function testCustomSfx() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const freq = parseFloat(document.getElementById('paramFreq').value);
  const decay = parseFloat(document.getElementById('paramDecay').value);
  const wave = document.getElementById('paramWave').value;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.25), now + decay);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.linearRampToValueAtTime(0, now + decay);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + decay);
}

function exportWav() {
  const sampleRate = 44100;
  const freq = parseFloat(document.getElementById('paramFreq').value);
  const decay = parseFloat(document.getElementById('paramDecay').value);
  const wave = document.getElementById('paramWave').value;
  const numSamples = Math.floor(sampleRate * decay);

  const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);
  const osc = offlineCtx.createOscillator();
  const gain = offlineCtx.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, 0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.25), decay);

  gain.gain.setValueAtTime(0.4, 0);
  gain.gain.linearRampToValueAtTime(0, decay);

  osc.connect(gain);
  gain.connect(offlineCtx.destination);
  osc.start(0);
  osc.stop(decay);

  offlineCtx.startRendering().then(renderedBuffer => {
    const channelData = renderedBuffer.getChannelData(0);
    const wavBlob = encodeWavBlob(channelData, sampleRate);
    const downloadUrl = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `sfx_${wave}_${Math.round(freq)}hz.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    showToast("Downloaded uncompressed WAV audio!");
  });
}

function encodeWavBlob(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

// Utility Toast
function showToast(message) {
  const existing = document.querySelector('.toast-banner');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-banner';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize on load with rich default assets across all tools
document.addEventListener('DOMContentLoaded', () => {
  setupDropzone();
  initMesh();
  setupMeshDrag();
  loadMeshPreset('aurora');
  loadSampleJson();
  loadSampleSvg();
  loadSampleIcon();
  initCustomGradient();
});
