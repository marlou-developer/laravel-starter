import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from '../sidebar';

export function NavMain({ items = [] }) {
    const page = usePage();
    const [openMenu, setOpenMenu] = useState(null);

    // Automatically open the current active group on page load
    useEffect(() => {
        const activeGroup = items.find((item) => {
            const href =
                typeof item.href === 'string'
                    ? item.href
                    : (item.href?.url ?? '#');
            return page.url.startsWith(href);
        });
        if (activeGroup) setOpenMenu(activeGroup.title);
    }, [page.url, items]);

    const handleToggle = (title) => {
        setOpenMenu((prev) => (prev === title ? null : title)); // toggle open/close
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => {
                    const href =
                        typeof item.href === 'string'
                            ? item.href
                            : (item.href?.url ?? '#');
                    const isActive = page.url.startsWith(href);
                    const hasChildren =
                        Array.isArray(item.children) &&
                        item.children.length > 0;
                    const isOpen = openMenu === item.title;

                    return (
                        <div key={item.title}>
                            {hasChildren ? (
                                <Collapsible
                                    open={isOpen}
                                    onOpenChange={() =>
                                        handleToggle(item.title)
                                    }
                                    className="group/collapsible"
                                >
                                    <SidebarGroup>
                                        <SidebarMenuButton
                                            className={isOpen && "bg-sidebar-accent"}
                                            asChild
                                        >
                                            <CollapsibleTrigger
                                                aria-expanded={isOpen}
                                            >
                                                <SidebarMenuItem className="-ml-2">
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        tooltip={{
                                                            children:
                                                                item.title,
                                                        }}
                                                    >
                                                        <a className="w-full flex-1">
                                                            {item.icon && (
                                                                <item.icon />
                                                            )}
                                                            <span>
                                                                {item.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>

                                                <ChevronDown
                                                    className={`ml-auto ${
                                                        !isOpen
                                                            ? 'rotate-180 transition-transform duration-200'
                                                            : ''
                                                    }`}
                                                />
                                            </CollapsibleTrigger>
                                        </SidebarMenuButton>

                                        <CollapsibleContent>
                                            {item.children.map((child) => {
                                                const childHref =
                                                    typeof child.href ===
                                                    'string'
                                                        ? child.href
                                                        : (child.href?.url ??
                                                          '#');
                                                const childActive =
                                                    page.url.startsWith(
                                                        childHref,
                                                    );

                                                console.log(
                                                    'childHref',
                                                    childActive,
                                                );

                                                return (
                                                    <SidebarMenuSub
                                                        key={child.title}
                                                    >
                                                        <SidebarMenuButton
                                                            asChild
                                                            isActive={
                                                                childActive
                                                            }
                                                            tooltip={{
                                                                children:
                                                                    child.title,
                                                            }}
                                                        >
                                                            <Link
                                                                href={childHref}
                                                                prefetch
                                                            >
                                                                {child.icon && (
                                                                    <child.icon />
                                                                )}
                                                                <span>
                                                                    {
                                                                        child.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuSub>
                                                );
                                            })}
                                        </CollapsibleContent>
                                    </SidebarGroup>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={href} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </div>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
