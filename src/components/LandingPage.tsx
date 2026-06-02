import React, { useState } from "react";
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

export default LandingPage;