import FormularioContacto from './components/FormularioContacto';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <main className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bienvenido a My App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ponte en contacto con nosotros usando el formulario
          </p>
        </div>
        
        <FormularioContacto />
      </main>
    </div>
  );
}
