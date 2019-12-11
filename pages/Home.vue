<template>
  <section>
    <button @click="$store.dispatch('setLocale', 'fr-FR')">fr-FR</button>
    <button @click="$store.dispatch('setLocale', 'en-US')">en-US</button>

    <Intl :message="translations.COMPLEX" :values="{ age: 123456 }">
      <template #name>
        <span :style="{ color: 'red' }">Bob</span>
      </template>

      <template #gender>
        <span :style="{ color: 'green' }">Male</span>
      </template>
    </Intl>

    <Intl tag="h1" :message="translations.ONE" :values="{ name: 'Bob' }" />
    <Intl tag="p" :message="translations.TWO" :values="{ date: new Date() }" />
    <Intl tag="p" :message="translations.THREE" :values="{ count: 1234.99 }" />
  </section>
</template>

<script>
import Intl from "@/translations/components/Intl";
import translations from "./Home.translations";

export default {
  components: {
    Intl
  },
  computed: {
    translations: () => translations
  }
};
</script>
