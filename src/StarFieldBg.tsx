import { useEffect, useRef, type default as React } from "react";

export const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    useEffect(() => {
        const { current: canvas } = canvasRef;
        function handleResize() {
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.scrollHeight;
            const numStars = Math.floor((canvas.width * canvas.height) / 2000); // Fator de ajuste
            adjustStarCount(numStars, canvas.width, canvas.height);
        }
        function onMouseMove(e: MouseEvent) {
            for(const star of stars) {
                star.onMouseMove(e.clientX, e.clientY)
            }
        }
        const ctx = canvas.getContext("2d")!;
        const stars: Star[] = [];
        const adjustStarCount = (numStars: number, canvasWidth: number, canvasHeight: number) => {
            const currentStars = stars.length;

            // Adiciona mais estrelas se necessário
            if (currentStars < numStars) {
                for (let i = currentStars; i < numStars; i++) {
                    stars.push(new Star(canvasWidth, canvasHeight));
                }
            }
            // Remove estrelas se necessário, ajustando o length
            else if (currentStars > numStars) {
                stars.length = numStars; // Reduz o tamanho do array de estrelas
            }
        };
        function draw() {
            if(!document.body.contains(canvas)) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(const star of stars) {
                star.update(canvas.width, canvas.height);
                star.draw(ctx);
            }

            requestAnimationFrame(draw);
        }
        handleResize();
        draw();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', onMouseMove)
        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', onMouseMove);
        };
    }, [])
    return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}


// Classe para representar uma estrela
class Star {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = 1; // Tamanho aleatório da estrela
        this.speedX = (Math.random() - 0.5) * 2; // Velocidade aleatória no eixo X
        this.speedY = (Math.random() - 0.5) * 2; // Velocidade aleatória no eixo Y
    }
    onMouseMove(x: number, y: number) {
        const diff = [x - this.x, y - this.y] as [number, number]
        const distance  = Math.sqrt(Math.pow(diff[0], 2) + Math.pow(diff[1], 2));
        if(distance > 100) {
            return;
        }
        const unitVector = [diff[0] / distance, diff[1] / distance];
        const invertedDistance = distance >= 1 ? 50 / distance : 0;
        this.speedX += unitVector[0] * invertedDistance;
        this.speedY += unitVector[1] * invertedDistance;
    }
    update(canvasWidth: number, canvasHeight: number) {
        // Atualiza a posição da estrela
        this.x += this.speedX;
        this.y += this.speedY;

        // Verifica se a estrela saiu do ecrâ e faz ela reaparecer no lado oposto
        // Tambem aproveitamos e fazemos a particula tambem teleportar pra uma posição aleatoria do outro lado do ecrã
        // e mudar a direção então essencialmente "reciclamos" a particula
        if (this.x < 0) {
            this.x = canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.speedY = (Math.random() - 0.5) * 2;
        }
        if (this.x > canvasWidth) {
            this.x = 0
            this.y = Math.random() * canvasHeight;
            this.speedY = (Math.random() - 0.5) * 2;
        }
        if (this.y < 0) {
            this.y = canvasHeight;
            this.x = Math.random() * canvasWidth;
            this.speedX = (Math.random() - 0.5) * 2;
        }
        if (this.y > canvasHeight) {
            this.y = 0;
            this.x = Math.random() * canvasWidth;
            this.speedX = (Math.random() - 0.5) * 2;
        }
        if(this.speedX > 1) {
            this.speedX *= 0.8;
        }
        if(this.speedY > 1) {
            this.speedY *= 0.8;
        }
        if(this.speedX < -1) {
            this.speedX *= 0.8;
        }
        if(this.speedY < -1) {
            this.speedY *= 0.8;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#AAA';
        ctx.fill();
    }
}
