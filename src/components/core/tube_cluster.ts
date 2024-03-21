import {Tube} from "./tube.ts";
import {Physical} from "./physical.ts";

export class TCluster extends Physical {
    // region statics

    static start_position = 320;
    static min_y_height = 50;
    static max_y_height = 250;
    static hole_width = 70;

    static GetRandomY(): number {
        const delta = this.max_y_height - this.min_y_height;
        const t_delta = Math.random();
        return this.min_y_height + delta*t_delta;
    }

    static SpawnOne(color: string) {
        const height = this.GetRandomY();
        return new TCluster(height, color);
    }

    // endregion

    static between_interval: number = 150;
    movement_speed: number = -.8;
    flag: boolean = true;

    Draw() {

    }
    Tick() {

    }
    FixedTick() {
        this.Move();
    }
    Move() {
        this.tubes[0].Move(this.movement_speed);
        this.tubes[1].Move(this.movement_speed);

        if (this.flag &&
            (TCluster.start_position - this.tubes[0].position.x >=
            TCluster.start_position - TCluster.between_interval)) {
            this.flag = false;
            TCluster.SpawnOne();
        }
    }

    tubes: Tube[] = [];

    constructor(height: number, color: string|null) {
        super();

        const top_v_pos = height - (TCluster.hole_width/2) - Tube.size.y;
        const bot_v_pos = height + (TCluster.hole_width/2);

        this.tubes.push(
            new Tube(this, TCluster.start_position, top_v_pos, color),
            new Tube(this, TCluster.start_position, bot_v_pos, color),
        );
    }
}

