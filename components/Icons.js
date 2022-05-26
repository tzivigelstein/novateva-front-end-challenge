export const User = props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

export const Search = props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

export const Bell = props => (
  <svg width={14} height={22} fill="none" {...props}>
    <path
      d="M7.154 3.556c2.615 0 4.77 2.154 4.77 4.77 0 .846-.232 1.692-.693 2.461L11 11.25l.461 1.461c.154.539.539.923 1.078 1.231.461.23.769.692.769 1.23v.309c0 .615-.539 1.153-1.154 1.153h-10C1.538 16.633 1 16.095 1 15.48v-.308c0-.539.308-1 .77-1.231.46-.23.845-.692 1.076-1.23l.462-1.462-.231-.462c-1.385-2.23-.615-5.23 1.615-6.538a4.772 4.772 0 0 1 2.462-.693ZM7.154 21.249a1.538 1.538 0 1 0 0-3.077 1.538 1.538 0 0 0 0 3.077Z"
      stroke="#858585"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.615 3.557v-.769c0-.846.693-1.538 1.539-1.538s1.538.692 1.538 1.538v.77"
      stroke="#858585"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Chat = props => (
  <svg width={17} height={13} fill="none" {...props}>
    <path
      d="M3.093 1.088h7.325c1.15 0 2.093.767 2.093 1.703v3.491c0 .937-.942 1.703-2.093 1.703H6.284L3.407 10.03V7.985h-.942C1.628 7.985 1 7.475 1 6.835V2.792c0-.936.942-1.703 2.093-1.703Z"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.708 8.752c0 .468.471.851 1.047.894l3.61.085 2.878 2.044V9.73h.941c.785 0 1.465-.51 1.465-1.192V4.494c0-.936-.941-1.703-2.092-1.703H12.51"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Config = props => (
  <svg width={18} height={14} fill="none" {...props}>
    <path d="M13.8 5.998H17V2.743h-3.2v3.255Z" stroke="url(#a)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.4 6.128v6.51" stroke="url(#b)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.4 8.602h3.2V5.347H7.4v3.255Z" stroke="url(#c)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9.383v3.255" stroke="url(#d)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 1.57v3.256" stroke="url(#e)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.4 1.57v.652" stroke="url(#f)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 11.206h3.2V7.95H1v3.255Z" stroke="url(#g)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.6 7.951v-6.51" stroke="url(#h)" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.6 12.508v-.651" stroke="url(#i)" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="a" x1={15.24} y1={6.51} x2={15.053} y2={0.745} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="b" x1={15.557} y1={9.708} x2={13.784} y2={9.717} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="c" x1={8.84} y1={9.114} x2={8.653} y2={3.349} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="d" x1={9.157} y1={11.173} x2={7.384} y2={11.19} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="e" x1={9.157} y1={3.361} x2={7.384} y2={3.378} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="f" x1={15.557} y1={1.929} x2={13.788} y2={2.015} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="g" x1={2.44} y1={11.718} x2={2.253} y2={5.952} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="h" x1={2.757} y1={5.022} x2={0.984} y2={5.03} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
      <linearGradient id="i" x1={2.757} y1={12.215} x2={0.988} y2={12.301} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FD749B" />
        <stop offset={1} stopColor="#281AC8" />
      </linearGradient>
    </defs>
  </svg>
)

export const ArrowRight = props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 16 16 12 12 8"></polyline>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
)

export const Check = props => (
  <svg
    width={24}
    height={24}
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4 12 14.01l-3-3" />
  </svg>
)

export const Trash = props => (
  <svg
    width={24}
    height={24}
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

export const Flag = props => (
  <svg
    width={24}
    height={24}
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
  </svg>
)

export const Times = props => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)
