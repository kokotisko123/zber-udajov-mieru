
export const Header = () => {
  return (
    <header 
      className="fixed w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-white/90 backdrop-blur-sm border-b border-red-600/20"
    >
      <div 
        className="flex items-center gap-2 text-black"
      >
        <span className="text-3xl font-bold text-red-600">OK</span>
        <span className="text-2xl font-bold tracking-wider">Riešenia</span>
      </div>
      
      <div className="flex items-center">
        <span className="text-3xl font-bold text-red-600">OK</span>
      </div>
    </header>
  );
};
