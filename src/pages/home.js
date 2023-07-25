import buffet from '../styles/buffet.jpg';
import '../styles/home.css';

export default function Home() {
    return (
        <div>
            <div class="title d-flex justify-content-center">
                <h1>Home</h1>
            </div>
            <div class="buffet-image title d-flex justify-content-center">
                <img src={buffet} />
            </div>
            <div class="title d-flex justify-content-center">
                <h2 class="welcome">Welcome to the informative stock website.</h2>
            </div>
            <div class="title d-flex justify-content-center">
                <h3 class="subtitle">Having accurate stock information is like a warm hug.</h3>
            </div>

        </div>
    );
}