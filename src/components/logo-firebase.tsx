
import * as React from "react"

export const FirebaseLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.419 13.065l-1.34-7.43L8 1.5l5.922 4.135-1.341 7.43L8 15.5l-4.581-2.435z"
      fill="#FFCA28"
    />
    <path d="M8 15.5V1.5l-4.581 11.565L8 15.5z" fill="#FFA000" />
    <path
      d="M3.419 13.065l.7-3.88 3.88-6.935L8 1.5 3.419 13.065z"
      fill="url(#firebase-logo-a)"
    />
    <path
      d="M12.581 13.065l-5.282-3.88-2.731-2.31 4.581-5.375L12.581 13.065z"
      fill="#FFC107"
    />
    <defs>
      <linearGradient
        id="firebase-logo-a"
        x1={6.33}
        y1={2.25}
        x2={5.222}
        y2={8.156}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFF" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FFF" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)
