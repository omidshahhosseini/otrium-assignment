import Checkbox from "../base/Checkbox";

interface Category {
  id: string;
  parent: string;
  name: string;
  children?: Category[];
}

interface CategoryItemProps {
  category: Category;
  selectedCategories: { [key: string]: boolean };
  expandedCategories: { [key: string]: boolean };
  toggleSelect: (categoryId: string, children: Category[]) => void;
  toggleExpand: (categoryId: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectedCategories,
  expandedCategories,
  toggleSelect,
  toggleExpand,
}) => {
  const isSelected = selectedCategories[category.id];
  const isExpanded = expandedCategories[category.id];

  const handleCheckboxChange = () => {
    toggleSelect(category.id, category.children || []);
  };

  return (
    <li>
      <Checkbox
        label={category.name}
        checked={!!isSelected}
        onChange={handleCheckboxChange}
        onLabelClick={() => toggleExpand(category.id)}
      />
      {isExpanded && category.children && (
        <ul>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              selectedCategories={selectedCategories}
              expandedCategories={expandedCategories}
              toggleSelect={toggleSelect}
              toggleExpand={toggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
