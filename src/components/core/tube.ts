import { TCluster } from "./tube_cluster.ts";
import { Drawable } from "./drawable.ts";


export class Tube extends Drawable {
    static size: {x: number, y: number} = {
        x: 50, y: 300
    };
    position: {x: number, y: number};
    color: string;

    Move(delta_x) {
        this.position.x += delta_x;
    }

    Draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, Tube.size.x, Tube.size.y);
    }

    constructor(cluster: TCluster, start_x: number, start_y: number, color: string) {
        super();


        this.position = {
            x: start_x,
            y: start_y,
        };
        
        this.color = color;

        this.cluster = cluster;
    }
}