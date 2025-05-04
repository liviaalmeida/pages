<template>
  <div
    class="menu"
    :class="{'menu--background': background}"
  >
    <Locale class="menu-locale" />
    <nav class="menu-nav">
      <button
        v-for="link in links"
        :key="link.text"
        :data-class="link.class"
        class="menu-link"
        @click="onNav(link.class)"
      >
        {{ $t(link.text) }}
      </button>
    </nav>
    <Hamburger
      v-model="open"
      class="menu-button"
    />
    <transition name="dropdown">
      <nav
        v-if="open"
        class="menu-drop"
        :class="{'menu-drop--background': background}"
      >
        <button
          v-for="link in links"
          :key="link.text"
          class="menu-link"
          @click="onNav(link.class)"
        >
          {{ $t(link.text) }}
        </button>
      </nav>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import mixpanel from 'mixpanel-browser'

import Hamburger from '@/ui/Hamburger.vue'
import Locale from '@/components/Locale.vue'

const links: Link[] = [
  {
    text: 'home.menu.about',
    class: 'hero',
  },
  {
    text: 'home.menu.knowledge',
    class: 'knowledge',
  },
  {
    text: 'home.menu.experience',
    class: 'experience',
  },
  {
    text: 'home.title.contact',
    class: 'contact',
  },
]

const open = ref(false)
function navigateTo(targetClass: string, offset = 0): void {
  const el = document.querySelector(`.${targetClass}`) as HTMLElement
  const { top } = el.getBoundingClientRect()

  window.scrollTo({
    top: window.scrollY + top + offset,
  })
}
function onNav(toClass: string) {
  navigateTo(toClass, -60)
  open.value = false

  mixpanel.track('Menu-click', {
    to: toClass,
  })
}

const background = ref(false)
function onScroll() {
  background.value = window.scrollY > 61
}
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
$height: 60px;
$link: 35px;
$transition: background-color 1s;

@mixin background {
  &--background {
    background-color: darken($lv-darker, 5%);
  }
}

.menu {
  @include background;
  background-color: $lv-dark;
  padding: 10px;
  position: fixed;
  transition: $transition;
  z-index: 200;
  height: $height;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-link {
  background-color: transparent;
  border: none;
  color: $lv-white;
  cursor: pointer;
  font-family: 'Abel';
  font-size: 20px;
  font-weight: 700;
  height: $link;
  margin: 0 20px;
  text-transform: lowercase;
}

.menu-nav {
  @include tablet {
    display: none;
  }
}

.menu-button {
  display: none;

  @include tablet {
    display: flex;
  }
}

.menu-drop {
  @include background;
  display: none;
  align-items: center;
  background-color: $lv-dark;
  overflow: hidden;
  transition: height .4s, $transition;
  position: absolute;
  left: 0;
  top: $height;
  height: 4 * $link;
  width: 100%;

  @include tablet {
    @include flex-column;
  }
}

.dropdown {
  &-enter {
    height: 0;
  }

  &-enter-to {
    height: 4 * $link;
  }

  &-leave-to {
    height: 0;
  }
}
</style>
