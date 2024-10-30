import {
    Bike,
    CalendarCheck2,
    ChefHat,
    HandPlatter,
    Newspaper,
    Soup,
    UtensilsCrossed,
} from "lucide-react";

export const navMenus = [
    {
        title: "Foods",
        url: "/foods",
        icon: Soup,
        isActive: false,
        items: [
            {
                title: "Create Foods",
                url: "/foods/create",
            },
            {
                title: "All Foods",
                url: "/foods",
            },
        ],
    },
    {
        title: "Menu",
        url: "/menu",
        icon: UtensilsCrossed,
        isActive: false,
        items: [
            {
                title: "Create New",
                url: "/menu/create",
            },
            {
                title: "All Menu",
                url: "/menu",
            },
        ],
    },
    {
        title: "Orders",
        url: "/orders",
        icon: HandPlatter,
        isActive: false,
        items: [
            {
                title: "Create Orders",
                url: "/orders/create",
            },
            {
                title: "All Orders",
                url: "/orders",
            },
        ],
    },
    {
        title: "Delivery Man",
        url: "/deliveryMan",
        icon: Bike,
        isActive: false,
        items: [
            {
                title: "Create Delivery Man",
                url: "/deliveryMan/create",
            },
            {
                title: "All Delivery Man",
                url: "/deliveryMan",
            },
        ],
    },
    {
        title: "Stuff",
        url: "/stuff",
        icon: ChefHat,
        isActive: false,
        items: [
            {
                title: "Create Stuff",
                url: "/stuff/create",
            },
            {
                title: "All Stuff",
                url: "/stuff",
            },
        ],
    },
    {
        title: "News",
        url: "/news",
        icon: Newspaper,
        isActive: false,
        items: [
            {
                title: "Create News",
                url: "/news/create",
            },
            {
                title: "All News",
                url: "/news",
            },
        ],
    },
    {
        title: "Reservation",
        url: "/reservation",
        icon: CalendarCheck2,
        isActive: false,
        items: [
            {
                title: "Create Reservation",
                url: "/reservation/create",
            },
            {
                title: "All Reservation",
                url: "/reservation",
            },
        ],
    },
];
