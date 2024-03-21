<script lang="ts">
import { onMounted, ref } from "vue";
import { TCluster  } from "./core/tube_cluster.ts";
import { Drawable  } from "./core/drawable.ts";
import { Player    } from "./core/player.ts";
import { GameState } from './core/game_state.ts';

let screenCanvas = ref<HTMLCanvasElement | null>(null);

function Load() {
  const canvas = screenCanvas.value;
  if (canvas) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = "red";
    ctx.fillRect(25, 25, 50, 50);
  }
}

onMounted(
    () => setTimeout(() => Load(), 80));


export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    const ctx = (this.$refs.screenCanvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    Drawable.set_ctx(ctx);

    TCluster.SpawnOne();

    const player = new Player(50, 125, 'blue');

    // Форсированный первый кадр
    Drawable.Draw(true);

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.isComposing || !event.keyCode || event.keyCode === 229) {
        return;
      }

      if (event.keyCode === 80) {
        GameState.playing = !GameState.playing;
      }
      if (event.keyCode === 32) {
        player.Jump();
      }
    });
  },

}
</script>

<template>
  <div class="screen">
    <canvas height="300" width="300" ref="screenCanvas"></canvas>
  </div>
</template>

<style scoped>
  .screen {
    width: 300px;
    height: 300px;
  }
  canvas {
    border: 2px solid white;
    width: 100%;
    height: 100%;
  }
</style>