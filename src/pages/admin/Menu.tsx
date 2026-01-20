import { useState } from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Image as ImageIcon,
    Edit,
    Trash2,
    Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menuItems as initialMenuItems } from "@/data/menu";
import { toast } from "sonner";

export default function AdminMenu() {
    const [items, setItems] = useState(initialMenuItems);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        basePrice: "",
        imageUrl: "",
        category: "classic",
        isActive: true,
    });

    const handleOpenDialog = (item?: any) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description,
                basePrice: item.basePrice.toString(),
                imageUrl: item.imageUrl,
                category: "classic", // Default or extract from logic
                isActive: item.isActive,
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                description: "",
                basePrice: "",
                imageUrl: "",
                category: "classic",
                isActive: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            // Update existing
            setItems(items.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData, basePrice: Number(formData.basePrice) }
                    : item
            ));
            toast.success("Menu item updated successfully");
        } else {
            // Add new
            const newItem = {
                id: (items.length + 1).toString(),
                ...formData,
                basePrice: Number(formData.basePrice),
                rating: 5.0,
                reviews: 0,
                tags: ["New"],
                slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
                spiceLevelDefault: "medium",
                addOns: [],
            };
            setItems([...items, newItem]);
            toast.success("Item added to menu");
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setItems(items.filter(item => item.id !== id));
            toast.success("Item removed from menu");
        }
    };

    const handleToggleStatus = (id: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, isActive: !item.isActive } : item
        ));
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Menu Management</h1>
                    <p className="text-muted-foreground">Add, edit, and organize your food items</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                    <Plus className="w-4 h-4" /> Add New Item
                </Button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search menu items..."
                    className="pl-9 max-w-md bg-card"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className={`group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${!item.isActive ? 'opacity-60 grayscale' : ''}`}>
                        {/* Image Area */}
                        <div className="aspect-video relative overflow-hidden bg-secondary">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleOpenDialog(item)}>
                                            <Edit className="w-4 h-4 mr-2" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleToggleStatus(item.id)}>
                                            {item.isActive ? 'Mark Inactive' : 'Mark Active'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <span className="px-2 py-1 bg-background/90 backdrop-blur-md text-xs font-bold rounded-md shadow-sm">
                                    ₹{item.basePrice}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display font-bold text-lg">{item.name}</h3>
                                <Switch
                                    checked={item.isActive}
                                    onCheckedChange={() => handleToggleStatus(item.id)}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Update the details of your menu item.' : 'Add a new delicious item to your menu.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Base Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                value={formData.basePrice}
                                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="image"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                                <Button type="button" variant="outline" size="icon">
                                    <ImageIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div className="flex items-center justify-between border rounded-lg p-3">
                            <div className="space-y-0.5">
                                <Label>Available for Order</Label>
                                <p className="text-xs text-muted-foreground">Turn off if item is out of stock</p>
                            </div>
                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={(c) => setFormData({ ...formData, isActive: c })}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
