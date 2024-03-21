import { Drawable } from "./drawable.ts";
import {GameState, playing} from "./game_state.ts";


class Intersection {
    initiator: Physical;
    target: Physical;
    point: { x: number, y: number };

    Run(): void {
        this.initiator.OnCollision(this.target, this.point);
    }

    constructor(initiator: Physical, target: Physical, point: {x: number, y: number}) {
        this.initiator = initiator;
        this.target = target;
        this.point = point;
    }
}

export class Physical extends Drawable {
    private static list: Physical[] = [];
    tag: string = 'default';
    intersection_tags: string[] = [];

    static OnCollision(other: Physical, point: {x: number, y: number}) {

    }

    static tickrate = 120;
    static fixed_tickrate = 45;

    static target_tick_interval = 1000 / Physical.tickrate;
    static fixed_tick_interval = 1000 / Physical.fixed_tickrate;

    async FixedTick() {
        throw new Error('Метод должен быть переопределен');
    }
    async Tick(delta: number) {
        throw new Error('Метод должен быть переопределен');
    }


    static async GetAllIntersections() {

    }

    static async Tick(last_call: number, cur_call: number): number {
        if (!GameState.playing) return;

        const tasks = [];
        const delta = cur_call - last_call;

        for (let el of this.list) {
            tasks.push(new Promise(async (res) => {
                await el.Tick(delta);
                res();
            }));
        }

        // Добавление таски работы с пересечениями
        tasks.push(new Promise(async (res) => {
            const intersections = await this.GetAllIntersections();
            for (let el of intersections) {

            }
        }));
        return await Promise.all(tasks);
    }
    static async FixedTick(): number {
        if (!GameState.playing) return;

        const tasks = [];

        for (let el of this.list) {
            tasks.push(new Promise(async (res) => {
                await el.FixedTick();
                res();
            }));
        }
        return await Promise.all(tasks);
    }


    static last_call_time = Date.now();
    static PhysicTick() {
        const CallTime = Date.now();
        this.Tick(this.last_call_time, CallTime);

        this.last_call_time = CallTime;
    }

    constructor() {
        super();
        Physical.list.push(this);
    }
}


// Планирование функций вызовов событий для физики
setInterval(() => {
    Physical.PhysicTick();
}, Physical.target_tick_interval);

setInterval(() => {
    Physical.FixedTick();
}, Physical.fixed_tick_interval);
