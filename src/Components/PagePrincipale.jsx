import NavBar from "./NavBar";
import Card from "./Card";
import Footer from "./Footer";

function PagePrincipale() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
         <div className="flex-grow">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <Card
            title="Tableau de Bord"
            description="Vue d'ensemble des finances en un coup d'œil."
            navigateTo="/dashboard"
          />
          <Card
            title="Rapports"
            description="Générez des rapports financiers détaillés."
            redirectUrl={null}
          />
          <Card
            title="Gestion des utilisateurs"
            description="Ajoutez et gérez les utilisateurs de votre système."
            redirectUrl={null}
          />
          <Card
            title="Facturation"
            description="Gérez les factures et les paiements."
            redirectUrl={null}
          />
          <Card
            title="Support client"
            description="Accédez au support et à l'aide."
            redirectUrl={null}
          />
          <Card
            title="Paramètres"
            description="Configurez vos préférences et paramètres."
            redirectUrl={null}
          />
        </div>
         </div>
        <Footer/>
    </div>
    </>
  );
}

export default PagePrincipale;