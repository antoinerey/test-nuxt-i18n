<script>
import IntlMessageFormat from "intl-messageformat";
import { tokenize } from "../utils";

const getMessage = (translation, locale) => {
  if (
    process.server &&
    global.translations &&
    global.translations[locale] &&
    global.translations[locale][translation.id]
  ) {
    return global.translations[locale][translation.id];
  }

  if (
    process.client &&
    window.translations &&
    window.translations[locale] &&
    window.translations[locale][translation.id]
  ) {
    return window.translations[locale][translation.id];
  }

  return translation.defaultMessage;
};

export default {
  props: {
    message: {
      type: Object,
      required: true,
      validator(message) {
        return Boolean(message.id) && Boolean(message.defaultMessage);
      }
    },
    values: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: [String, Object],
      default: "span"
    }
  },
  computed: {
    content() {
      const { locale } = this.$store.state;
      const message = getMessage(this.message, locale).replace(
        /{(\w*), html}/g,
        `'{$1}'`
      );

      const translated = new IntlMessageFormat(message, locale).format(
        this.values
      );

      const keys = Object.keys(this.$slots);
      const tokens = tokenize(translated, keys).map(token => {
        if (token.startsWith("{") && token.endsWith("}")) {
          return this.$slots[token.substr(1, token.length - 2)];
        }

        return token;
      });

      return tokens;
    }
  },
  render(h) {
    return h(this.tag, null, this.content);
  }
};
</script>
