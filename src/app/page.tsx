'use client';
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import logo from "../assets/Logo.png";
import rpgImage from "../assets/rpg.jpeg";
import neuroImage from "../assets/neuro.jpeg";
import rehabImage from "../assets/rehab.jpeg";
import puncionSeca from "../assets/punción-seca.jpeg";
import micro from "../assets/microeletrolisis.jpeg";
import tapping from "../assets/tapping.jpeg";
import porqueImg from "../assets/porque-elegirnos.jpeg";
import historyImg from "../assets/historyImg.jpeg";

type ModalData = {
  title: string;
  image: string;
  description: string;
  link: string;
};

export default function Home() {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <div>
      {/* Header */}
      <header
        className="py-3 shadow-sm d-flex align-items-center"
        style={{ height: "10vh", backgroundColor: "#ffffff" }}
      >
        <div
          className="container d-flex justify-content-between align-items-center"
          style={{ maxWidth: "90%" }}
        >
          <div>
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={250}
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>
          <nav className="d-none d-lg-flex mx-auto">
            <a href="#especializaciones" className="mx-3 text-dark text-decoration-none">Especializaciones</a>
            <a href="#porque-elegirnos" className="mx-3 text-dark text-decoration-none">¿Por qué elegirnos?</a>
            <a href="#rpg" className="mx-3 text-dark text-decoration-none">Sobre la RPG</a>
            <a href="#contacto" className="mx-3 text-dark text-decoration-none">Contacto</a>
          </nav>
          <div>
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="hero container-fluid d-flex align-items-center"
        style={{ background: "#ffffff", minHeight: "80vh" }}
      >
        <div className="row w-100 align-items-center" style={{ margin: "0 auto", maxWidth: "90%", color: "#FFFFFF" }}>
          <div className="col-lg-6 order-lg-1 text-left p-4 position-relative">
            <h1 className="display-4 font-extrabold" style={{ fontSize: "80px", fontWeight: "800", textShadow: "4px 4px 20px rgba(0,0,0,0.7)" }}>
              RPG & NEURO <br />
              <span style={{ fontWeight: "200", fontSize: "50px", textShadow: "4px 4px 20px rgba(0,0,0,0.7)" }}>en movimiento</span>
            </h1>
            <br />
            <p className="lead" style={{ textShadow: "4px 4px 20px rgba(0,0,0,0.685)" }}>
              Nos avalan 15 años de profesionalismo y <br />dedicación a nuestros pacientes<br /><br />
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=543516167601&text=Hola+Diego+quisiera+recibir+más+información+sobre+RPG+y+NEURO"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light text-primary fw-normal btn-lg"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section id="especializaciones" className="container my-5">
        <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>Nuestras Especialidades</h2>
        <div className="row">
          {[
            { title: "RPG", img: rpgImage, desc: "Método terapéutico que corrige la postura y trata disfunciones musculoesqueléticas mediante estiramientos y reeducación del movimiento", fullDesc: "Es un innovador método de fisioterapia suave, progresivo y activo, que puede ser aplicado en cualquier edad respetando las posibilidades de cada persona.", link: "https://www.rpg.org.es/el-metodo-rpg/" },
            { title: "NEURO", img: neuroImage, desc: "Tratamiento para recuperar funciones motoras y cognitivas afectadas por trastornos neurológicos, como ACV o lesiones medulares", fullDesc: "Se define como la rama de la fisioterapia encargada del tratamiento y rehabilitación de las alteraciones o problemas derivados de una afección, enfermedad o lesión en el sistema nervioso central o periférico.", link: "https://www.fisioterapianeurologica.es/tratamientos/concepto-bobath/" },
            { title: "REHABILITACIÓN DEPORTIVA", img: rehabImage, desc: "Proceso de recuperación para atletas y personas activas, enfocado en restablecer la función, prevenir lesiones y optimizar el rendimiento.", fullDesc: "Es un subtipo de la rehabilitación que se enfoca en la prevención y manejo de lesiones en deportistas recreativos, de alto rendimiento o en pacientes con alguna enfermedad que estén realizando ejercicio terapéutico para su tratamiento.", link: "https://fisiostar.com/fisioterapia-tratamientos/fisioterapia-deportiva/" },
          ].map((item) => (
            <div key={item.title} className="col-md-4 text-left">
              <div
                className="card border-0 shadow p-3 rounded-3 overflow-hidden"
                style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                onClick={() => setModalData({ title: item.title, image: (item.img as any).src, description: item.fullDesc, link: item.link })}
              >
                <Image src={item.img} alt={item.title} className="card-img-top w-100" style={{ objectFit: "cover", height: "250px" }} width={800} height={250} />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <span style={{ color: "#1A8BCD" }}>Ver más</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal especialidades */}
      {modalData && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050, background: "rgba(0,0,0,0.5)" }}>
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

      {/* Por qué elegirnos */}
      <section id="porque-elegirnos" className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <Image src={porqueImg} alt="Por qué elegirnos" className="img-fluid rounded" width={500} height={300} style={{ objectFit: "cover" }} />
            </div>
            <div className="col-md-6 text-start">
              <h2 className="mb-4" style={{ fontWeight: "bold", marginTop: "30px" }}>¿Por qué nos eligen?</h2>
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                {["Brindamos un servicio personalizado", "Ayudamos a las personas a aliviar su dolor", "Mejoramos la calidad de vida", "Ayudamos a recuperarse a través de un tratamiento adecuado"].map((item) => (
                  <li key={item} className="d-flex align-items-center mb-3">
                    <span style={{ color: "#1A8BCD", marginRight: "10px" }}>✔</span>{item}
                  </li>
                ))}
              </ul>
              <a href="https://www.instagram.com/rpg.diegoviglione/" target="_blank" rel="noopener noreferrer" style={{ color: "#1A8BCD", textDecoration: "none" }}>
                Mira nuestro trabajo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Otras formaciones */}
      <section id="formaciones" className="container my-5">
        <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>Otras Formaciones</h2>
        <div className="row">
          {[
            { title: "PUNCIÓN SECA", img: puncionSeca, desc: "Es una técnica invasiva utilizada en fisioterapia para eliminar puntos dolorosos musculares (o puntos gatillo), que se pueden generar debido a sobrecargas, movimientos bruscos, etc." },
            { title: "MICROELECTRÓLISIS PERCUTÁNEA", img: micro, desc: "Consiste en la aplicación de una corriente galvánica en el orden de microamperios, en forma percutánea (con una aguja de acupuntura) con el fin de generar analgesia, regeneración del tejido y normalización del pH local." },
            { title: "TAPPING NEUROMUSCULAR", img: tapping, desc: "La técnica del kinesiotaping consiste en la aplicación de unas tiras adhesivas que se adaptan al músculo y cuya textura y elasticidad proporcionan estabilidad sin restringir la movilidad." },
          ].map((item) => (
            <div key={item.title} className="col-md-4 text-left">
              <div className="card border-0 shadow p-3 rounded-3 overflow-hidden" style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                <Image src={item.img} alt={item.title} className="card-img-top w-100" style={{ objectFit: "cover", height: "250px" }} width={800} height={250} />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Historia RPG */}
      <section className="container my-5" id="rpg">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 style={{ fontWeight: "bold", margin: "15px 0px 30px 0px" }}>
              Breve historia sobre la <span style={{ color: "#368bcd", fontWeight: "bold" }}>RPG</span>
            </h2>
            <p>La Reeducación Postural Global (RPG) es un método terapéutico desarrollado por Philippe Souchard que busca corregir desequilibrios musculares y mejorar la postura. Se basa en el principio de que el cuerpo funciona como una cadena interconectada, donde una compensación en una zona puede afectar a otras.</p>
            <p>Este enfoque se adapta a cada persona según sus necesidades específicas, permitiendo tratar desde dolores musculares hasta problemas crónicos.</p>
            <a target="_blank" rel="noopener noreferrer" href="https://www.rpg.org.es/philippe-souchard/" className="text-primary">Ver más</a>
          </div>
          <div className="col-lg-6">
            <Image src={historyImg} alt="Historia de RPG" className="img-fluid" style={{ borderRadius: "8px" }} width={600} height={400} />
          </div>
        </div>
      </section>

      {/* Logo */}
      <section className="container my-1">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-lg-6 d-flex justify-content-center">
            <Image src={logo} alt="logo rpg" style={{ maxWidth: "40%", height: "auto", margin: "-60px 0px 0px 0px" }} width={200} height={100} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4 text-white" id="contacto">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-left">
              <h5 className="fw-bold">RPG Diego Viglione</h5>
              <p>Mejorando tu bienestar con una atención individualizada y especializada.</p>
              <div className="d-flex gap-4" style={{ margin: "20px 0" }}>
                <a href="https://www.facebook.com/lic.viglione.d" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} className="text-white" /></a>
                <a href="https://www.instagram.com/rpg.diegoviglione/" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} className="text-white" /></a>
              </div>
            </div>
            <div className="col-md-4 text-left">
              <h5 className="fw-bold">Links útiles</h5>
              <ul className="list-unstyled">
                <li><a href="#especializaciones" className="text-white text-decoration-none">Especializaciones</a></li>
                <li><a href="#porque-elegirnos" className="text-white text-decoration-none">¿Por qué elegirnos?</a></li>
                <li><a href="#rpg" className="text-white text-decoration-none">Sobre la RPG</a></li>
                <li><a href="#contacto" className="text-white text-decoration-none">Contacto</a></li>
              </ul>
            </div>
            <div className="col-md-4 text-left">
              <h5 className="fw-bold">Donde estamos</h5>
              <iframe
                title="RPG MAPA"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.1664618447826!2d-64.19150632646983!3d-31.40953947426485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432997589335413%3A0x39bfd5b42cd881d3!2sDiego%20Viglione%20RPG%26NEURO!5e0!3m2!1sen!2sar!4v1741379001133!5m2!1sen!2sar"
                width="100%" height="150" style={{ border: "0", borderRadius: "8px" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-3"><small>© 2025 Todos los derechos reservados</small></div>
      </footer>
    </div>
  );
}
