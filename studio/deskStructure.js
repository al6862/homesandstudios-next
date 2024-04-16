import S from '@sanity/desk-tool/structure-builder';

const hiddenDocTypes = (listItem) =>
  !['siteConfig', 'home-page', 'infoPage'].includes(listItem.getId());

const deskStructure = () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Home Page')
        .child(S.editor().schemaType('home-page').documentId('home-page')),
      S.listItem()
        .title('Info Page')
        .child(S.editor().schemaType('infoPage').documentId('infoPage')),
    ]);

export default deskStructure;
