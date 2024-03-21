import { GameState } from "./game_state.ts";

export class Drawable {
    private static  list = [];
    static ctx: CanvasRenderingContext2D;

    Draw() {
        throw new Error('Draw() must be implemented');
    }

    static Draw(forced) {
        if (!forced && !GameState.playing) return;

        this.ctx.clearRect(0, 0, 300, 300);
        for (let i in this.list) {
            let el: Drawable = this.list[i];
            el.Draw(Drawable.ctx);
        }
    }

    static set_ctx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }


    static DrawTick() {
        this.Draw();
    }

    constructor() {
        Drawable.list.push(this);
    }
}


function _TFunDrawTick() {
    Drawable.DrawTick();

    requestAnimationFrame(() => _TFunDrawTick());
}
// Планирование отрисовки положений объектов
requestAnimationFrame(() => _TFunDrawTick());
