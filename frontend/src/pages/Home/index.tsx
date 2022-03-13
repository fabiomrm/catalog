import { Navbar } from "components/Navbar"
import { ButtonIcon } from "components/ButtonIcon";
import { ReactComponent as MainImage } from "assets/images/main-img.svg";
import './styles.css';

export const Home = () => {
    return(
        <>
            <Navbar />
            <div className="home-container">
                <div className="home-card">
                    <div className="home-content-container">
                        <div>
                            <h1>Conheça o melhor catálogo de produtos</h1>
                            <p>Ajudaremos você a encontrar os melhores produtos disponíveis.</p>
                        </div>
                        <ButtonIcon />
                    </div>
                    <div className="home-image-container">
                        <MainImage />
                    </div>
                </div>
            </div>
        </>
    )
}