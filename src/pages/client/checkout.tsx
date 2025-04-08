
import ProductCheckout from "../../components/checkout";
import Footerpage from "../../components/Footer";
import Header from "../../components/Header";


const Checkout = () => {
    return (
        <div>
            <Header />
            {/* Header part end*/}
            {/* breadcrumb start*/}
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
            <ProductCheckout />
            <Footerpage/>
        </div>
    )
}
export default Checkout;