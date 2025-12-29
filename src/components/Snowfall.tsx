import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 80; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-fall"
            style={{
              left: `${flake.x}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
            }}
          >
            <div className="w-full h-full bg-white rounded-full shadow-lg" />
          </div>
        ))}
      </div>
      
      {/* Новогодние огоньки */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none z-40 h-12">
        <div className="flex justify-around items-start h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="animate-twinkle"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5],
                  boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5]}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Snowfall;