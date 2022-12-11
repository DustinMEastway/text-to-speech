/** Data structure representing a EPUB's content.opf file. */
export interface EpubBookContent {
  package: {
    manifest: [
      {
        item: {
          $: {
            href: string;
            id: string;
          };
        }[];
      }
    ];
    spine: [
      {
        itemref: {
          $: {
            idref: string;
          };
        }[];
      }
    ];
  };
}

function keyInObject<K extends string, T>(key: K, value: T): value is T & Record<K, unknown> {
  return (
    value != null
    && typeof value === 'object'
    && key in value
  );
}

export namespace EpubBookContent {
  export function is(value: unknown): value is EpubBookContent {
    return (
      keyInObject('package', value)
      && keyInObject('manifest', value.package)
      && value.package.manifest instanceof Array
      && keyInObject('item', value.package.manifest[0])
      && value.package.manifest[0].item instanceof Array
      && (value.package.manifest[0].item as unknown[]).every((item) => {
        return (
          keyInObject('$', item)
          && keyInObject('href', item.$)
          && keyInObject('id', item.$)
        );
      })
      && keyInObject('spine', value.package)
      && value.package.spine instanceof Array
      && keyInObject('itemref', value.package.spine[0])
      && value.package.spine[0].itemref instanceof Array
      && (value.package.spine[0].itemref as unknown[]).every((itemref) => {
        return (
          keyInObject('$', itemref)
          && keyInObject('idref', itemref.$)
        );
      })
    );
  }
}
