import NavBar2 from "./NavBar2";
import Footer from "./Footer";

const AboutUs = () => (
  <div className="d-flex flex-column vh-100">
    <NavBar2 />
    <div className="card py-3 shadow-lg col-lg-8 mx-auto">
      <h1 className="text-center">Hakkımızda</h1>
      <p>
        EYC BABY 2019 yılında girişimci bir anne tarafından kuruldu. Bebeğimi
        büyütürken ihtiyaç duyduğum zararlı kimyasallar içermeyen ve
        annelerin kullanırken rahat edebileceği ürünler üretmeye karar verdim.
        Doğallığı her bebeğin hakettiğini, her bebeğin özel olduğunu düşünerek
        organik ürünler üretmeye başladım. Siz değerli annelerin akıllarında
        soru işareti bırakmadan üretmeyi ve geliştirmeyi kendine ilke edinen EYC
        BABY bu yolda emin adımlarla devam edecektir.
      </p>
    </div>
    <Footer />
  </div>
);

export default AboutUs;
