"use client";
export const dataExample = `ClassName: Book
properties:
  - name: id
    primitive_type: string
    value_object: UUID
    initial_value: "''"
    label: Internal ID
  - name: title
    primitive_type: string
    value_object: Title
    initial_value: "''"
    label: Title
  - name: isbn10
    primitive_type: string
    value_object: ISBN10
    initial_value: "''"
    label: ISBN 10
  - name: isbn13
    primitive_type: string
    value_object: ISBN13
    initial_value: "''"
    label: ISBN 13
  - name: pages
    primitive_type: string
    value_object: PositiveNumber
    initial_value: 0
    label: Pages
  - name: language
    primitive_type: string
    value_object: Language
    initial_value: "''"
    label: Language
  - name: publisher
    primitive_type: string
    value_object: CompanyName
    initial_value: "''"
    label: Publisher
  - name: publishedIn
    primitive_type: Date
    value_object: ShortDate
    initial_value: new Date()
    label: Published In
`;
export const templateExample = `import { GenericEntity } from 'smart-value-objects/dist/Types';
import { CompanyName, ISBN10, ISBN13, Language, PositiveNumber, SingleWord, Title, UUID, createUUID, ShortDate } from 'smart-value-objects/dist/ValueObjects';

export const {{ClassName}}Initial: {{ClassName}}Model = {
{{#each properties}}
  {{name}}: {{{initial_value}}}{{#unless @last}},{{/unless}}
{{/each}}
};

export type {{ClassName}}Model = {
{{#each properties}}
  {{name}}: {{primitive_type}};
{{/each}}
};

export default class {{ClassName}} extends GenericEntity {
{{#each properties}}
  _{{name}}: {{value_object}};
{{/each}}

  constructor(public props: BookModel) {
    super();
    
{{#each properties}}
    this._{{name}} = this.initProp(this, new {{value_object}}(props?.{{name}}, '{{label}}'));
{{/each}}
  }

  get key() {
    return this.id;
  }
 
{{#each properties}}
  get {{name}}() {
    return this._{{name}}.value;
  }
 
{{/each}}
  toJson() {
    const fields = {
{{#each properties}}
      {{name}}: this.{{name}}, 
{{/each}}
      publishedIn: this.publishedIn,
      key: this.uid,
      sort: this.title,
    };
    return fields;
  }
}`;
