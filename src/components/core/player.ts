import { Drawable } from "./drawable.ts";
import { Physical } from "./physical.ts";

export class Player extends Physical {
    static size = {
        x: 25, y: 25,
    };
    position: { x: number, y: number } = {
        x: 50, y: 125,
    };
    color: string;


    Draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, Player.size.x, Player.size.y);
    }

    static gravity = 2.5;
    ver_velocity = 0;

    Tick(delta) {
        this.position.y += this.ver_velocity * (delta/1000);
    }
    FixedTick() {
        this.ver_velocity += Player.gravity;
        const tubes = Physical.ByTag('tube');

    }

    static jump_force = -75;
    Jump() {
        if (this.ver_velocity <= 0) {
            this.ver_velocity += Player.jump_force;
        }
        else {
            this.ver_velocity = Player.jump_force;
        }
    }

    constructor(start_x, start_y, color) {
        super();



        this.color = color;
        this.position = {
            x: start_x,
            y: start_y
        };
    }
}