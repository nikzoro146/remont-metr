interface SlideDecorProps {
  number: string;
}

export const SlideDecor = ({ number }: SlideDecorProps) => (
  <>
    {/* Noise */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
    {/* Сетка */}
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
    {/* Оранжевое пятно */}
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-400/15 blur-3xl pointer-events-none" />
    {/* Номер секции */}
    <div className="absolute top-16 right-8 font-unbounded font-bold text-[9rem] leading-none text-[#141414] opacity-[0.05] pointer-events-none select-none">
      {number}
    </div>
    {/* Силуэт зданий */}
    <svg
      className="absolute bottom-0 left-0 w-full h-40 md:h-56 pointer-events-none opacity-[0.06]"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#141414"
        d="M0,160 L0,140 L20,140 L20,60 L45,60 L45,140 L60,140 L60,90 L80,90 L80,140 L95,140 L95,30 L120,30 L120,140 L140,140 L140,75 L160,75 L160,140 L175,140 L175,50 L200,50 L200,140 L215,140 L215,95 L235,95 L235,140 L250,140 L250,20 L278,20 L278,140 L295,140 L295,70 L315,70 L315,140 L330,140 L330,45 L355,45 L355,140 L370,140 L370,85 L390,85 L390,140 L405,140 L405,35 L430,35 L430,140 L445,140 L445,65 L468,65 L468,140 L485,140 L485,25 L510,25 L510,140 L525,140 L525,80 L545,80 L545,140 L560,140 L560,55 L585,55 L585,140 L600,140 L600,90 L620,90 L620,140 L635,140 L635,40 L660,40 L660,140 L675,140 L675,70 L695,70 L695,140 L710,140 L710,30 L735,30 L735,140 L750,140 L750,85 L770,85 L770,140 L785,140 L785,50 L810,50 L810,140 L825,140 L825,95 L845,95 L845,140 L860,140 L860,25 L885,25 L885,140 L900,140 L900,75 L920,75 L920,140 L935,140 L935,45 L960,45 L960,140 L975,140 L975,90 L995,90 L995,140 L1010,140 L1010,35 L1035,35 L1035,140 L1050,140 L1050,65 L1072,65 L1072,140 L1088,140 L1088,20 L1115,20 L1115,140 L1130,140 L1130,80 L1150,80 L1150,140 L1165,140 L1165,55 L1188,55 L1188,140 L1200,140 L1200,160 Z"
      />
    </svg>
  </>
);