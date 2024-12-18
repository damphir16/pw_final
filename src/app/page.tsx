import Container from "@/UI/container/components/Container";
import HomeBanner from "@/UI/navBar/components/HomeBanner";


export default function Home () {
    return (
        <div className = { "p-8" }>
            <Container>
                <div>
                    <HomeBanner/>
                </div>
            </Container>
        </div>
    );
}
