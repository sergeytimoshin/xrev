export type Face = {
  id: string;
  version: string;
  url: string;
};

export type Template = {
  id: number;
  name: string;
  url: string;
  selected: boolean;
}

export type MaterialTab = {
  material: string;
  colors_advanced: Color[];
  selected_color: Color['id'];
};

export type TemplateTab = {
  name: string;
  templates: Template[];
};

export type Tab = MaterialTab | TemplateTab | (MaterialTab & TemplateTab);

export type Clothes = Record<string, Clothing[]>;

export type Clothing = {
  name: string;
  selected_color: Color['id'];
  templates: Template[];
};

export type Color = {
  id: number;
  hex: `#${string}`;
};
