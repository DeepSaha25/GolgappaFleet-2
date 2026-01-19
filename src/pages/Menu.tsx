import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartBar } from "@/components/cart/CartBar";
import { menuItems } from "@/data/menu";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types";

const categories = [
  { id: "all", name: "All" },
  { id: "bestseller", name: "Bestsellers" },
  { id: "spicy", name: "Spicy" },
  { id: "sweet", name: "Sweet" },
  { id: "new", name: "New" },
];

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleAddClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.tags.includes(activeCategory);

    return matchesSearch && matchesCategory && item.isActive;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <CartBar />

      <main className="pt-20 pb-32 md:pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <h1 className="text-4xl font-display font-bold mb-2">Our Menu</h1>
            <p className="text-muted-foreground">
              Handcrafted with love, served with joy
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for golgappas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-semibold text-lg mb-2">
                No items found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard item={item} onAddClick={handleAddClick} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ProductModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
