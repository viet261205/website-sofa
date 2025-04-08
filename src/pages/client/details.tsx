import Footerpage from "../../components/Footer";
import Header from "../../components/Header";
import ProductDetails from "../../components/ProductDetails";


const ProductDetail = () => {
    return (
        <div>
           <Header/>
            <section className="breadcrumb breadcrumb_bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="breadcrumb_iner">
                                <div className="breadcrumb_iner_item">
                                    <h2>Shop Single</h2>
                                    <p>Home <span>-</span> Shop Single</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           <ProductDetails/>
            <Footerpage />
        </div>
    )
}
export default ProductDetail;