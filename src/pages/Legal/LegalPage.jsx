import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import SiteFooter from "../../Components/SiteFooter/SiteFooter";
import FloatingWhatsApp from "../../Components/FloatingWhatsApp/FloatingWhatsApp";

const pages = {
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    intro:
      "Esta página explica como a Pousada Rosália trata informações relacionadas ao uso deste site e aos canais de contato disponíveis.",
    sections: [
      {
        title: "Informações coletadas",
        content:
          "Este site não possui formulário próprio de cadastro ou pagamento. Podemos receber informações quando você entra em contato por WhatsApp, telefone, e-mail, Instagram ou pela plataforma de reservas Bukly. Esses dados são usados para responder solicitações, verificar disponibilidade e dar andamento ao atendimento.",
      },
      {
        title: "Analytics e navegação",
        content:
          "Usamos ferramentas como Google Tag Manager para medir interações com botões, links de reserva e navegação do site. Também usamos armazenamento local do navegador para lembrar o idioma escolhido. Essas informações ajudam a melhorar a experiência e acompanhar a efetividade das campanhas.",
      },
      {
        title: "Serviços de terceiros",
        content:
          "Ao clicar em links para WhatsApp, Bukly, Instagram ou Google Maps, você passa a usar serviços de terceiros, sujeitos às políticas próprias dessas plataformas.",
      },
      {
        title: "Contato sobre privacidade",
        content:
          "Para dúvidas ou solicitações relacionadas a privacidade, fale conosco pelo e-mail pousadarosalia@hotmail.com ou pelo telefone (47) 3345-1821.",
      },
    ],
  },
  "reservas-e-cancelamento": {
    title: "Reservas e Cancelamento",
    intro:
      "Estas condições orientam o processo de reserva e atendimento. Valores, disponibilidade e regras específicas são confirmados durante a solicitação ou na plataforma de reservas.",
    sections: [
      {
        title: "Como reservar",
        content:
          "As reservas podem ser solicitadas pelo botão Reserve Agora, pela plataforma Bukly, pelo WhatsApp, telefone ou e-mail. A reserva depende de disponibilidade, confirmação dos dados da estadia e conclusão das condições informadas no atendimento.",
      },
      {
        title: "Pagamentos",
        content:
          "As formas de pagamento e eventuais sinais, parcelas ou condições especiais são informados no momento da reserva. Antes de concluir, confira datas, quantidade de hóspedes, tipo de acomodação e valores.",
      },
      {
        title: "Cancelamentos e alterações",
        content:
          "Pedidos de cancelamento, remarcação ou alteração de datas devem ser feitos pelos canais oficiais da pousada. As regras aplicáveis podem variar conforme tarifa, temporada, prazo de antecedência e plataforma utilizada.",
      },
      {
        title: "Check-in, check-out e dúvidas",
        content:
          "O check-in ocorre a partir das 14h e o check-out até as 11h. Para dúvidas sobre uma reserva existente, entre em contato pelo WhatsApp (47) 98805-9849 ou telefone (47) 3345-1821.",
      },
    ],
  },
};

const LegalPage = () => {
  const { slug } = useParams();
  const page = pages[slug];

  if (!page) return <Navigate to="/" replace />;

  return (
    <>
      <Header />

      <main className="bg-primary" style={{ paddingTop: "calc(36px + 96px)" }}>
        <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <Link
            to="/"
            className="inline-flex text-secondary hover:text-dark text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 mb-8"
          >
            Voltar para o site
          </Link>

          <p className="section-subtitle">Informações legais</p>
          <h1 className="section-title mb-6">{page.title}</h1>
          <p className="text-dark/65 text-base md:text-lg font-sans leading-relaxed mb-10">
            {page.intro}
          </p>

          <div className="space-y-8">
            {page.sections.map((section) => (
              <section key={section.title} className="border-t border-dark/10 pt-8">
                <h2 className="text-2xl md:text-3xl font-serif font-light text-dark mb-3">
                  {section.title}
                </h2>
                <p className="text-dark/65 text-sm md:text-base font-sans leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <p className="text-dark/40 text-xs font-sans mt-12">
            Última atualização: 12 de maio de 2026.
          </p>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default LegalPage;
