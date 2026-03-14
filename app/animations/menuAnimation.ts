// animations/header.ts

export function openHeaderAnimation({
  isMobile = false,
  yOffset = 0,
  borderRadius = 25,
  duration = 1.5
} = {}) {
  const main = document.getElementById("main")
  const mainContent = document.getElementById("main-content")
  if (!main || !mainContent) return

  mainContent.style.transform = `translateY(${-yOffset}px)`
  main.style.transform = `translateY(${yOffset}px) translateZ(0)`
  main.style.pointerEvents = "none"

  const targetY = isMobile ? yOffset + 0.9 * window.innerHeight : yOffset + 0.9 * window.innerHeight
  main.animate(
    [
      { transform: `translateY(${yOffset}px) scale(1)`, borderRadius: "0px" },
      { transform: `translateY(${targetY}px) scale(0.96)`, borderRadius: `${borderRadius}px` },
    ],
    {
      duration: duration * 1000,
      easing: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      fill: "forwards",
    }
  )
}

export function closeHeaderAnimation({
  yOffset = 0,
  duration = 1.5
} = {}) {
  const main = document.getElementById("main")
  const mainContent = document.getElementById("main-content")
  if (!main || !mainContent) return

  const animation = main.animate(
    [
      {
        transform: getComputedStyle(main).transform === "none"
          ? `translateY(${yOffset}px) scale(0.96)`
          : getComputedStyle(main).transform,
      },
      { transform: `translateY(${yOffset}px) scale(1)`, borderRadius: "0px" },
    ],
    {
      duration: duration * 1000,
      easing: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      fill: "forwards",
    }
  )

  animation.onfinish = () => {
    mainContent.style.removeProperty("transform")
    main.style.removeProperty("transform")
    main.style.removeProperty("border-radius")
    main.style.removeProperty("pointer-events")
  }
}
