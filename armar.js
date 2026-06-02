const fs = require('fs');

// 1. Crear las carpetas de la arquitectura
const carpetas = ['src/pages', 'src/components', 'src/styles', 'src/types'];
carpetas.forEach(c => fs.mkdirSync(c, { recursive: true }));

// 2. Definir los contenidos
const tipos = `export interface Video {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}`;

const css = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700;800;900&display=swap');
body { font-family: 'Barlow', sans-serif; }
nav a { color: black !important; text-decoration: none; position: relative; transition: color 0.3s; }
nav a::after { content: ''; position: absolute; bottom: 0; right: 0; width: 0; height: 2px; background-color: #1A8BCD; transition: width 0.3s ease-out; }
nav a:hover { color: #1A8BCD !important; }
nav a:hover::after { width: 100%; }
.btn { transition: background-color 0.3s, color 0.3s; font-weight: bold; text-decoration: none !important; }
.btn:hover { background-color: #1a8bcdca !important; color: #fff !important; }
.hero { position: relative; background: #E1EEFF; min-height: 85vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/hero-image.png'); background-size: cover; background-position: center; background-repeat: no-repeat; z-index: 0; }
.hero .row { position: relative; z-index: 2; margin: 0 auto; max-width: 90%; }
.hero h1 { font-weight: bold; }
.hero p { font-size: 18px; line-height: 1.5; }
@media (max-width: 768px) {
  .hero h1 { font-size: 28px !important; }
  .hero h1 span { display: inline-block; white-space: nowrap; }
  .hero .hero-image { object-fit: cover; margin-left: -100px; width: 100%; height: auto; }
  .hero { min-height: 80vh; }
  .hero .col-lg-6 img { width: 100%; max-width: 400px; }
  .hero h1 { font-size: 50px !important; margin-top: -40px; }
  .hero p { font-size: 20px; text-align: left; }
  .hero .btn { margin-left: 0; margin-right: 0; text-align: left; display: inline-block; max-width: 200px; color: #1A8BCD !important; }
}
.footer { background-color: #1A8BCD; }
.footer h5 { margin-bottom: 10px; }
.footer p, .footer a, .footer small { color: white; }
.footer a:hover { text-decoration: underline; }
a, button { text-decoration: none !important; -webkit-tap-highlight-color: transparent; }
a:active, a:focus, button:active, button:focus { outline: none !important; box-shadow: none !important; background-color: inherit !important; }`;

const landing = `import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";

type ModalData = { title: string; image: string; description: string; link: string; };

const LandingPage = () => {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <div>
      <header className="py-3 shadow-sm d-flex align-items-center" style={{ height: "10vh", backgroundColor: "#ffffff" }}>
        <div className="container d-flex justify-content-between align-items-center" style={{ maxWidth: "90%" }}>
          <div>
            <Image src="/Logo.png" alt="Logo" width={150} height={250} style={{ objectFit: "contain", height: "auto" }} />
          </div>
          <nav className="d-none d-lg-flex mx-auto">
            <a href="#especializaciones" className="mx-3 text-dark text-decoration-none">Especializaciones</a>
            <a href="#porque-elegirnos" className="mx-3 text-dark text-decoration-none">¿Por qué elegirnos?</a>
            <a href="#rpg" className="mx-3 text-dark text-decoration-none">Sobre la RPG</a>
            <a href="#contacto" className="mx-3 text-dark text-decoration-none">Contacto</a>
          </nav>
          <div>
            <Link href="/login" className="btn fw-normal btn-lg" style={{ backgroundColor: "#1A8BCD", color: "#FFFFFF", fontSize: "16px" }}>
              Ingresar
            </Link>
          </div>
        </div>
      </header>

      <section className="hero container-fluid d-flex align-items-center" style={{ background: "#ffffff", minHeight: "80vh" }}>
        <div className="row w-100 align-items-center" style={{ margin: "0 auto", maxWidth: "90%", color: "#FFFFFF" }}>
          <div className="col-lg-6 order-lg-1 text-left p-4 position-relative">
            <h1 className="display-4 font-extrabold" style={{ fontSize: "80px", fontWeight: "800", textShadow: "4px 4px 20px rgba(0, 0, 0, 0.7)" }}>
              RPG & NEURO <br />
              <span className="position-relative" style={{ fontWeight: "200", fontSize: "50px", textShadow: "4px 4px 20px rgba(0, 0, 0, 0.7)" }}>
                en movimiento
              </span>
            </h1>
            <br />
            <p className="lead" style={{ textShadow: "4px 4px 20px rgba(0, 0, 0, 0.685)" }}>
              Nos avalan 15 años de profesionalismo y <br /> dedicación a nuestros pacientes<br /><br />
            </p>
            <a href="https://api.whatsapp.com/send?phone=543516167601" target="_blank" rel="noopener noreferrer" className="btn btn-light text-primary fw-normal btn-lg">
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      <section id="especializaciones" className="container my-5">
        <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>Nuestras Especialidades</h2>
        <div className="row">
          <div className="col-md-4 text-left">
            <div className="card border-0 shadow p-3 rounded-3 overflow-hidden" style={{ cursor: "pointer", transition: "transform 0.3s ease" }} onClick={() => setModalData({ title: "RPG", image: "/rpg.jpeg", description: "Es un innovador método...", link: "https://www.rpg.org.es/el-metodo-rpg/" })}>
              <div className="position-relative">
                <Image src="/rpg.jpeg" alt="RPG" className="card-img-top w-100" style={{ objectFit: "cover", height: "250px" }} width={800} height={250} />
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>RPG</h5>
                <p className="card-text">Método terapéutico que corrige la postura y trata disfunciones musculoesqueléticas mediante estiramientos y reeducación del movimiento.</p>
                <span style={{ color: "#1A8BCD" }}>Ver más</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalData && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ display: "block", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontWeight: "bold" }}>{modalData.title}</h5>
                <button type="button" className="btn-close" onClick={() => setModalData(null)}></button>
              </div>
              <div className="modal-body">
                <p>{modalData.description}</p>
                <a href={modalData.link} className="text-primary" target="_blank" rel="noopener noreferrer">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer py-4 text-white" id="contacto">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-left text-md-start">
              <h5 className="fw-bold">RPG Diego Viglione</h5>
              <p>Mejorando tu bienestar...</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;`;

const app = `import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Diego Viglione RPG</title>
        <meta name="description" content="Plataforma de RPG & NEURO" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="50x50" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;`;

const index = `import React from "react";
import LandingPage from "../components/LandingPage";

const IndexPage: React.FC = () => {
  return <LandingPage />;
};

export default IndexPage;`;

// 3. Escribir los archivos en las rutas correctas
fs.writeFileSync('src/types/index.ts', tipos);
fs.writeFileSync('src/styles/globals.css', css);
fs.writeFileSync('src/components/LandingPage.tsx', landing);
fs.writeFileSync('src/pages/_app.tsx', app);
fs.writeFileSync('src/pages/index.tsx', index);

console.log("¡Todo listo, Rodri! Tu arquitectura fue creada de forma automática.");