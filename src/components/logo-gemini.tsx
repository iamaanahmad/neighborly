
import * as React from "react"

export const GeminiLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="url(#gemini-logo-a)"
      d="M12.5 2.25a.75.75 0 0 0-1.5 0v18a.75.75 0 0 0 1.5 0v-18Z"
    />
    <path
      fill="url(#gemini-logo-b)"
      d="M21.75 11.5h-18a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5Z"
    />
    <defs>
      <linearGradient
        id="gemini-logo-a"
        x1={11}
        x2={11}
        y1={2.25}
        y2={21.75}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6E44FF" />
        <stop offset={1} stopColor="#8459FF" />
      </linearGradient>
      <linearGradient
        id="gemini-logo-b"
        x1={3.75}
        x2={21.75}
        y1={13}
        y2={13}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6E44FF" />
        <stop offset={1} stopColor="#438BFF" />
      </linearGradient>
    </defs>
  </svg>
)
