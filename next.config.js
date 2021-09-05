const regexEqual = (x, y) =>
x instanceof RegExp &&
y instanceof RegExp &&
x.source === y.source &&
x.global === y.global &&
x.ignoreCase === y.ignoreCase &&
x.multiline === y.multiline;

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack(config) {
        const cssRules = config.module.rules
          .find((rule) => typeof rule.oneOf === "object")
          .oneOf.filter((rule) =>
              rule.sideEffects === false &&
              regexEqual(rule.test, /\.module\.css$/)
          );

        cssRules.forEach(rules => {
            rules.use = rules.use.map((rule) => {
                if (!/\bcss-loader\b/.test(rule.loader)) return rule;

                return {
                    ...rule,
                    options: {
                        ...rule.options,
                        modules: {
                            ...rule.options.modules,
                            getLocalIdent: (_, __, exportName) => {
                                return exportName;
                            }
                        }
                    }
                };
            });
        });

        return config;
    }
};
