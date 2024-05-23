import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import categoriesData from "../../constants/filters.json";
import Button from "../base/Button";
import "./style.css";

interface Category {
  id: string;
  parent: string;
  name: string;
  children?: Category[];
}
// Generate a category tree structure from a flat list of categories
const generateCategoryTree = (categories: Category[]): Category[] => {
  const categoryMap: { [key: string]: Category } = {}; // Object to store categories by their IDs
  const tree: Category[] = []; // Array to store the category tree

  // First pass: Create categoryMap
  categories.forEach((category) => {
    category.children = [];
    categoryMap[category.id] = category;
  });

  // Second pass: Build the tree
  categories.forEach((category) => {
    if (category.parent === "0") {
      tree.push(category); // If parent ID is '0', it's a root category
    } else {
      const parentCategory = categoryMap[category.parent]; // Get parent category from categoryMap
      if (parentCategory && parentCategory.children) {
        parentCategory.children.push(category); // Add category as a child of its parent
      }
    }
  });

  return tree;
};

const CategoryTree: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);
  const [isAllSelected, setAllSelected] = useState<boolean>(false);

  useEffect(() => {
    const categories = categoriesData.data.categories as Category[];
    const tree = generateCategoryTree(categories);
    setCategoryTree(tree);
  }, []);

  // Toggle the selection of a category and its children
  const toggleSelect = (categoryId: string, children: Category[]) => {
    setSelectedCategories((prev) => {
      const newSelections = { ...prev, [categoryId]: !prev[categoryId] }; // Toggle selection for the category
      const updateChildren = (childNodes: Category[], isSelected: boolean) => {
        childNodes.forEach((child) => {
          newSelections[child.id] = isSelected; // Toggle selection for child category
          if (child.children && child.children.length > 0) {
            updateChildren(child.children, isSelected); // Recursively update children
          }
        });
      };
      updateChildren(children, !prev[categoryId]); // Update children selection
      return newSelections;
    });
  };

  // Toggle the expansion of a category
  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId], // Toggle expansion state for the category
    }));
  };

  // Toggle select/deselect all categories
  const toggleSelectAll = (select: boolean) => {
    const newSelections: { [key: string]: boolean } = {};
    const setAllSelections = (nodes: Category[]) => {
      nodes.forEach((node) => {
        newSelections[node.id] = select; // Toggle selection for each category
        if (node.children && node.children.length > 0) {
          setAllSelections(node.children); // Recursively toggle selection for children
        }
      });
    };
    setAllSelections(categoryTree); // Set selections for the entire category tree
    setSelectedCategories(newSelections); // Update selected categories state
    setAllSelected(!isAllSelected); // Toggle all selection flag
  };

  return (
    <div className="filter-container">
      <Button onClick={() => toggleSelectAll(!isAllSelected)}>
        {isAllSelected ? "Deselect All" : " Select All"}
      </Button>
      <ul>
        {categoryTree.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selectedCategories={selectedCategories}
            expandedCategories={expandedCategories}
            toggleSelect={toggleSelect}
            toggleExpand={toggleExpand}
          />
        ))}
      </ul>
      <div>
        <h3>Selected Categories:</h3>
        <ul>
          {Object.keys(selectedCategories).map(
            (key) =>
              selectedCategories[key] && (
                <li key={key}>
                  {
                    categoriesData.data.categories.find(
                      (category: Category) => category.id === key
                    )?.name
                  }
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryTree;
