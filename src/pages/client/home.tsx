
import Banner from "../../components/banner";
import ProductCard from "../../components/card";
import Category from "../../components/Category";
import Footerpage from "../../components/Footer";
import Header from "../../components/Header";

import Logo from "../../components/logo_client";
import ProductCart1 from "../../components/productcart1";
import Sale from "../../components/sale";
import Subscribe from "../../components/Subscribe";


const Homepages = () => {

  return (
    <div>
  <Header/>
  <Banner/>
  <Category/>
 <ProductCard/>
<Sale/>
<ProductCart1/>
<Subscribe/>
  <Logo/>
  <Footerpage/>
</div>

    

  );
};

export default Homepages;
