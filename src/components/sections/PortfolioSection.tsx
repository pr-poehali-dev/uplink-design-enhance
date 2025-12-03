import { motion } from 'framer-motion';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PortfolioSection = () => {
  const portfolio = [
    {
      title: 'Установка камер на частном доме',
      description: 'IP-камеры высокого разрешения с удаленным доступом',
      image: 'https://cdn.poehali.dev/files/65fdee94-8b71-4353-a0e8-c901cc0f509d.jpg'
    },
    {
      title: 'Прокладка локальной сети в школе',
      description: 'Монтаж сетевых коммутаторов и прокладка кабельных линий',
      image: 'https://cdn.poehali.dev/files/cdd98429-7c5f-4767-8207-883dff66bf19.jpg'
    },
    {
      title: 'Прокладка локальной сети в офисном помещении',
      description: 'Структурированная кабельная система с серверным шкафом',
      image: 'https://cdn.poehali.dev/files/b79e04e5-a401-42ef-a231-fa831dcb62dd.jpg'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Портфолио</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Примеры наших реализованных проектов
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl h-full">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
