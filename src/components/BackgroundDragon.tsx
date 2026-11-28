import {useEffect, useRef} from 'react';

interface Segment {
  x: number;
  y: number;
  angle: number;
}

const SEGMENT_COUNT = 32;

function normalizeAngle(angle: number): number {
  let a = angle;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function lerpAngle(from: number, to: number, t: number): number {
  const diff = normalizeAngle(to - from);
  return from + diff * t;
}

function getSegmentScale(index: number): number {
  if (index === 0) return 1;
  if (index <= 6) {
    return 0.62 + (index / 6) * 0.38;
  }
  if (index <= 10) {
    return 1.0 - ((index - 6) / 4) * 0.16;
  }
  if (index <= 14) {
    return 0.84 + ((index - 10) / 4) * 0.06;
  }
  const tailT = (index - 14) / (SEGMENT_COUNT - 1 - 14);
  return Math.max(0.22, 0.9 - tailT * 0.68);
}

function getSegmentSpacing(index: number, scale: number): number {
  if (index <= 1) return 15 * scale;
  if (index <= 10) return 13.5 * scale;
  const tailT = (index - 10) / (SEGMENT_COUNT - 1 - 10);
  return (13.2 - tailT * 6.4) * scale;
}

function getSegmentColor(index: number): string {
  if (index <= 8) return '#7dd3fc';
  if (index <= 18) return '#38bdf8';
  if (index <= 26) return '#0ea5e9';
  return '#0284c7';
}

function drawHead(ctx: CanvasRenderingContext2D, seg: Segment, scale: number) {
  ctx.save();
  ctx.translate(seg.x, seg.y);
  ctx.rotate(seg.angle);

  // Outer skull silhouette with glowing light-blue edge
  ctx.beginPath();
  ctx.moveTo(21 * scale, 0);
  ctx.quadraticCurveTo(13 * scale, 8.5 * scale, -1 * scale, 12.5 * scale);
  ctx.quadraticCurveTo(-11 * scale, 13.5 * scale, -17 * scale, 10 * scale);
  ctx.quadraticCurveTo(-11 * scale, 4.5 * scale, -8 * scale, 0);
  ctx.quadraticCurveTo(-11 * scale, -4.5 * scale, -17 * scale, -10 * scale);
  ctx.quadraticCurveTo(-11 * scale, -13.5 * scale, -1 * scale, -12.5 * scale);
  ctx.quadraticCurveTo(13 * scale, -8.5 * scale, 21 * scale, 0);
  ctx.closePath();

  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 16 * scale;
  ctx.fillStyle = '#7dd3fc';
  ctx.fill();

  ctx.lineJoin = 'round';
  ctx.lineWidth = 1.6 * scale;
  ctx.strokeStyle = '#e0f2fe';
  ctx.stroke();

  // Inner skull plate
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(15 * scale, 0);
  ctx.quadraticCurveTo(7 * scale, 5 * scale, -4 * scale, 6.5 * scale);
  ctx.lineTo(-6 * scale, 0);
  ctx.lineTo(-4 * scale, -6.5 * scale);
  ctx.quadraticCurveTo(7 * scale, -5 * scale, 15 * scale, 0);
  ctx.closePath();
  ctx.fillStyle = '#38bdf8';
  ctx.fill();

  // Glowing pale-blue eyes & crest diamond
  ctx.shadowColor = '#bae6fd';
  ctx.shadowBlur = 8 * scale;
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.ellipse(6 * scale, -4.8 * scale, 2.4 * scale, 1.3 * scale, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(6 * scale, 4.8 * scale, 2.4 * scale, 1.3 * scale, 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(2 * scale, 0);
  ctx.lineTo(-2 * scale, 2.2 * scale);
  ctx.lineTo(-5 * scale, 0);
  ctx.lineTo(-2 * scale, -2.2 * scale);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawVertebra(
  ctx: CanvasRenderingContext2D,
  seg: Segment,
  index: number,
  scale: number,
) {
  const factor = getSegmentScale(index) * scale;
  const r = 10.5 * factor;

  ctx.save();
  ctx.translate(seg.x, seg.y);
  ctx.rotate(seg.angle);

  ctx.beginPath();
  ctx.moveTo(0.62 * r, 0);
  ctx.quadraticCurveTo(0.45 * r, 0.65 * r, -0.15 * r, 0.92 * r);
  ctx.quadraticCurveTo(-0.75 * r, 1.28 * r, -1.08 * r, 1.38 * r);
  ctx.quadraticCurveTo(-0.52 * r, 0.72 * r, -0.45 * r, 0.34 * r);
  ctx.quadraticCurveTo(-0.62 * r, 0.14 * r, -0.78 * r, 0);
  ctx.quadraticCurveTo(-0.62 * r, -0.14 * r, -0.45 * r, -0.34 * r);
  ctx.quadraticCurveTo(-0.52 * r, -0.72 * r, -1.08 * r, -1.38 * r);
  ctx.quadraticCurveTo(-0.75 * r, -1.28 * r, -0.15 * r, -0.92 * r);
  ctx.quadraticCurveTo(0.45 * r, -0.65 * r, 0.62 * r, 0);
  ctx.closePath();

  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = Math.max(5, 12 * factor);
  ctx.fillStyle = getSegmentColor(index);
  ctx.fill();

  // Crisp glowing outer edge around each vertebra
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(0.75, 1.35 * factor);
  ctx.strokeStyle = index <= 14 ? '#e0f2fe' : '#bae6fd';
  ctx.stroke();

  if (index <= 16) {
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0.05 * r, 0, 0.2 * r, 0, Math.PI * 2);
    ctx.fillStyle = index <= 8 ? '#e0f2fe' : '#bae6fd';
    ctx.fill();
  }

  ctx.restore();
}

function drawWingPair(
  ctx: CanvasRenderingContext2D,
  anchor: Segment,
  nextAnchor: Segment,
  span: number,
  ribCount: number,
  flapOffset: number,
  scale: number,
  isFront: boolean,
) {
  const bend = normalizeAngle(anchor.angle - nextAnchor.angle) * 0.45;

  for (const side of [-1, 1] as const) {
    ctx.save();
    ctx.translate(anchor.x, anchor.y);
    ctx.rotate(anchor.angle + bend * 0.35);

    const sideSign = side;
    const sweepAngle = sideSign * (1.28 + flapOffset * 0.14);

    // Primary leading wing arm
    const p0x = 0;
    const p0y = sideSign * 6 * scale;
    const p1x = Math.cos(sweepAngle) * span * 0.46 + 18 * scale;
    const p1y = Math.sin(sweepAngle) * span * 0.56;
    const p2x = -span * 0.52;
    const p2y = sideSign * span * 0.94;

    ctx.lineCap = 'round';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = (isFront ? 15 : 12) * scale;

    ctx.beginPath();
    ctx.moveTo(p0x, p0y);
    ctx.quadraticCurveTo(p1x, p1y, p2x, p2y);
    ctx.strokeStyle = isFront ? '#7dd3fc' : '#38bdf8';
    ctx.lineWidth = (isFront ? 3.2 : 2.6) * scale;
    ctx.stroke();

    // Luminous ice-blue core along leading wing edge
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(p0x, p0y);
    ctx.quadraticCurveTo(p1x, p1y, p2x, p2y);
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = (isFront ? 1.25 : 1.0) * scale;
    ctx.stroke();

    // Sweeping skeletal wing-ribs fanning backward with edge glow
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = (isFront ? 11 : 9) * scale;
    for (let r = 0; r < ribCount; r++) {
      const t = 0.2 + (r / (ribCount - 1)) * 0.8;
      const omt = 1 - t;

      const rx = omt * omt * p0x + 2 * omt * t * p1x + t * t * p2x;
      const ry = omt * omt * p0y + 2 * omt * t * p1y + t * t * p2y;

      const ribLen = span * (0.48 + (1 - Math.abs(t - 0.55)) * 0.42) * (1 - r * 0.04);
      const tipX = rx - ribLen * (0.84 + r * 0.03);
      const tipY = ry + sideSign * ribLen * (0.28 - r * 0.06);

      const ctrlX = rx - ribLen * 0.25;
      const ctrlY = ry + sideSign * ribLen * 0.34;

      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
      ctx.strokeStyle = r % 3 === 0 && isFront ? '#bae6fd' : '#7dd3fc';
      ctx.lineWidth = Math.max(0.95, (2.1 - r * 0.14) * scale);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function getScrollX(): number {
  return window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

function getScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function BackgroundDragon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;

    const getScale = () => Math.min(1.48, Math.max(0.88, (width / 1280) * 1.42));
    const getDefaultAnchor = () => {
      const s = getScale();
      const pageX = width < 640 ? width * 0.66 : Math.min(width - 210 * s, width * 0.72);
      const pageY = width < 640 ? 142 : 162;
      return {pageX, pageY};
    };

    // Segments live in document (page) coordinates so scrolling moves the dragon out of view
    const segments: Segment[] = Array.from({length: SEGMENT_COUNT}, () => ({
      x: 0,
      y: 0,
      angle: Math.PI,
    }));

    const initPose = () => {
      const s = getScale();
      const {pageX, pageY} = getDefaultAnchor();
      segments[0].x = pageX;
      segments[0].y = pageY;
      segments[0].angle = Math.PI * 0.92;

      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const spacing = getSegmentSpacing(i, s);
        const curve = Math.sin(i * 0.24) * 0.22;
        const prev = segments[i - 1];
        const dir = prev.angle + Math.PI + curve;
        segments[i].x = prev.x + Math.cos(dir) * spacing;
        segments[i].y = prev.y + Math.sin(dir) * spacing;
        segments[i].angle = normalizeAngle(dir + Math.PI);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    initPose();

    let isCursorActive = false;
    let isCoastingStop = false;
    let targetPageX = segments[0].x;
    let targetPageY = segments[0].y;
    let headVx = 0;
    let headVy = 0;
    let wingPhase = 0;
    let lastTime = performance.now();

    // Touch gesture tracking: summon while touching, cancel if scroll occurs, coast to stop on finger lift
    let isTouching = false;
    let isScrollGesture = false;
    let touchStartScrollX = 0;
    let touchStartScrollY = 0;
    let prevActive = false;
    let prevCoasting = false;
    let prevTargetX = targetPageX;
    let prevTargetY = targetPageY;
    let lastTouchTime = -1000;

    const setPageTargetFromClient = (clientX: number, clientY: number) => {
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return;
      isCursorActive = true;
      isCoastingStop = false;
      targetPageX = clientX + getScrollX();
      targetPageY = clientY + getScrollY();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      if (performance.now() - lastTouchTime < 700) return;
      setPageTargetFromClient(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      if (performance.now() - lastTouchTime < 700) return;
      setPageTargetFromClient(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (performance.now() - lastTouchTime < 700) return;
      setPageTargetFromClient(e.clientX, e.clientY);
    };

    const cancelScrollTouch = () => {
      isScrollGesture = true;
      lastTouchTime = performance.now();
      isCursorActive = prevActive;
      isCoastingStop = prevCoasting;
      targetPageX = prevTargetX;
      targetPageY = prevTargetY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      lastTouchTime = performance.now();
      isTouching = true;
      isScrollGesture = false;
      touchStartScrollX = getScrollX();
      touchStartScrollY = getScrollY();
      prevActive = isCursorActive;
      prevCoasting = isCoastingStop;
      prevTargetX = targetPageX;
      prevTargetY = targetPageY;
      setPageTargetFromClient(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      lastTouchTime = performance.now();
      if (!isTouching || isScrollGesture) return;
      const scrollDelta = Math.hypot(
        getScrollX() - touchStartScrollX,
        getScrollY() - touchStartScrollY,
      );
      if (scrollDelta > 4) {
        cancelScrollTouch();
        return;
      }
      const touch = e.touches[0];
      if (touch) {
        setPageTargetFromClient(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      lastTouchTime = performance.now();
      if (isScrollGesture) {
        isTouching = false;
        isScrollGesture = false;
        return;
      }

      // Whenever the user removes their last finger from the screen, stop chasing and coast smoothly to rest
      if (e.touches.length === 0) {
        isCursorActive = true;
        isCoastingStop = true;
        targetPageX = segments[0].x;
        targetPageY = segments[0].y;
      }

      isTouching = e.touches.length > 0;
      isScrollGesture = false;
    };

    const handleScroll = () => {
      if (!isTouching || isScrollGesture) return;
      const scrollDelta = Math.hypot(
        getScrollX() - touchStartScrollX,
        getScrollY() - touchStartScrollY,
      );
      if (scrollDelta > 4) {
        cancelScrollTouch();
      }
    };

    const returnToDefault = () => {
      isCursorActive = false;
      isCoastingStop = false;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        returnToDefault();
      }
    };

    const renderFrame = (time: number) => {
      const dt = Math.min(32, Math.max(8, time - lastTime)) / 16.6667;
      lastTime = time;

      const s = getScale();
      const {pageX: defPageX, pageY: defPageY} = getDefaultAnchor();

      const idleX = prefersReduced ? 0 : Math.sin(time * 0.0008) * 22 * s;
      const idleY = prefersReduced ? 0 : Math.sin(time * 0.0016) * 9 * s;

      const head = segments[0];

      if (isCoastingStop) {
        // Gentle aerial glide deceleration when finger is removed from the screen
        const coastDamp = Math.pow(0.935, dt);
        headVx *= coastDamp;
        headVy *= coastDamp;

        if (Math.hypot(headVx, headVy) < 0.04) {
          headVx = 0;
          headVy = 0;
        }

        head.x += headVx * dt;
        head.y += headVy * dt;
        targetPageX = head.x;
        targetPageY = head.y;
      } else {
        const goalX = isCursorActive ? targetPageX : defPageX + idleX;
        const goalY = isCursorActive ? targetPageY : defPageY + idleY;

        const dx = goalX - head.x;
        const dy = goalY - head.y;
        const dist = Math.hypot(dx, dy);

        // Smooth arrival deceleration curve (gradual ease-out with zero overshoot)
        const arrivalRadius = 150 * s;
        const farSpeed = dist > height * 0.8 ? Math.min(52 * s, dist * 0.085) : 16 * s;
        let desiredSpeed = 0;

        if (dist > 0.4) {
          const ratio = Math.min(1, dist / arrivalRadius);
          const eased = ratio * ratio * (3 - 2 * ratio);
          desiredSpeed = Math.min(farSpeed * eased, dist * 0.14);
        }

        const desiredAngle = dist > 0.4 ? Math.atan2(dy, dx) : head.angle;
        const turnEase = Math.min(1, dist / (20 * s));
        const baseTurnRate = isCursorActive ? 0.2 : 0.11;
        head.angle = lerpAngle(head.angle, desiredAngle, Math.min(1, baseTurnRate * turnEase * dt));

        const desiredVx = Math.cos(head.angle) * desiredSpeed;
        const desiredVy = Math.sin(head.angle) * desiredSpeed;

        // Responsive acceleration while touching/moving, soft braking on arrival
        const velocityBlend = isTouching ? 0.22 : dist < 40 * s ? 0.12 : 0.15;
        headVx += (desiredVx - headVx) * Math.min(1, velocityBlend * dt);
        headVy += (desiredVy - headVy) * Math.min(1, velocityBlend * dt);

        const speedNow = Math.hypot(headVx, headVy);
        if (dist < 4 * s || speedNow > dist * 0.24 + 0.8) {
          const settleDamp = Math.pow(0.84, dt);
          headVx *= settleDamp;
          headVy *= settleDamp;
        }

        head.x += headVx * dt;
        head.y += headVy * dt;
      }

      const currentSpeed = Math.hypot(headVx, headVy);
      const motionActivity = Math.min(1, currentSpeed / (9 * s));

      // Inverse kinematics chain in page coordinates
      let minY = head.y;
      let maxY = head.y;
      for (let i = 1; i < SEGMENT_COUNT; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];
        const spacing = getSegmentSpacing(i, s);

        let sdx = curr.x - prev.x;
        let sdy = curr.y - prev.y;
        if (Math.abs(sdx) < 0.0001 && Math.abs(sdy) < 0.0001) {
          sdx = -Math.cos(prev.angle);
          sdy = -Math.sin(prev.angle);
        }

        const segAngleFromPrev = Math.atan2(sdy, sdx);
        const waveAmp = 0.008 + 0.018 * motionActivity;
        const idleWave = prefersReduced
          ? 0
          : Math.sin(time * 0.0026 - i * 0.42) * waveAmp * (i / SEGMENT_COUNT);
        const finalAngle = segAngleFromPrev + idleWave;

        curr.x = prev.x + Math.cos(finalAngle) * spacing;
        curr.y = prev.y + Math.sin(finalAngle) * spacing;
        curr.angle = normalizeAngle(finalAngle + Math.PI);

        if (curr.y < minY) minY = curr.y;
        if (curr.y > maxY) maxY = curr.y;
      }

      ctx.clearRect(0, 0, width, height);

      const scrollX = getScrollX();
      const scrollY = getScrollY();
      const wingPad = 260 * s;

      if (!prefersReduced) {
        wingPhase += (0.032 + 0.048 * motionActivity) * dt;
      }

      // Only draw when any part of the dragon or its wings intersects the visible viewport
      if (maxY + wingPad >= scrollY && minY - wingPad <= scrollY + height) {
        ctx.save();
        ctx.translate(-scrollX, -scrollY);

        const wingAmp = 0.55 + 0.45 * motionActivity;
        const flapFront = prefersReduced ? 0 : Math.sin(wingPhase) * wingAmp;
        const flapRear = prefersReduced ? 0 : Math.sin(wingPhase - 1.15) * wingAmp;

        drawWingPair(ctx, segments[6], segments[7], 118 * s, 8, flapFront, s, true);
        drawWingPair(ctx, segments[14], segments[15], 78 * s, 6, flapRear, s, false);

        for (let i = SEGMENT_COUNT - 1; i >= 1; i--) {
          drawVertebra(ctx, segments[i], i, s);
        }

        drawHead(ctx, segments[0], s);

        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    window.addEventListener('resize', resize, {passive: true});
    window.addEventListener('scroll', handleScroll, {passive: true, capture: true});
    window.addEventListener('pointermove', handlePointerMove, {passive: true, capture: true});
    window.addEventListener('pointerdown', handlePointerDown, {passive: true, capture: true});
    window.addEventListener('mousemove', handleMouseMove, {passive: true, capture: true});
    window.addEventListener('touchstart', handleTouchStart, {passive: true, capture: true});
    window.addEventListener('touchmove', handleTouchMove, {passive: true, capture: true});
    window.addEventListener('touchend', handleTouchEnd, {passive: true, capture: true});
    window.addEventListener('touchcancel', handleTouchEnd, {passive: true, capture: true});
    document.documentElement.addEventListener('mouseleave', returnToDefault);
    window.addEventListener('blur', returnToDefault);
    document.addEventListener('visibilitychange', handleVisibility);

    animationFrameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll, {capture: true});
      window.removeEventListener('pointermove', handlePointerMove, {capture: true});
      window.removeEventListener('pointerdown', handlePointerDown, {capture: true});
      window.removeEventListener('mousemove', handleMouseMove, {capture: true});
      window.removeEventListener('touchstart', handleTouchStart, {capture: true});
      window.removeEventListener('touchmove', handleTouchMove, {capture: true});
      window.removeEventListener('touchend', handleTouchEnd, {capture: true});
      window.removeEventListener('touchcancel', handleTouchEnd, {capture: true});
      document.documentElement.removeEventListener('mouseleave', returnToDefault);
      window.removeEventListener('blur', returnToDefault);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
