import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, User } from 'lucide-react';
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
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarMenuButton asChild>
                            <CollapsibleTrigger >
                                {/* <div className='flex items-center justify-between'>
                                  
                                    Components
                                </div> */}
                                {/* <User className='h-4'/> */}

                                <SidebarMenuItem  className="-ml-2">
                                    <SidebarMenuButton
                                        asChild
                                        isActive={page.url
                                            .startsWith
                                            // typeof item.href === 'string'
                                            //     ? item.href
                                            //     : item.href.url,
                                            ()}
                                        tooltip={{ children: 'Components' }}
                                    >
                                        <Link href={'/'} prefetch>
                                            <User className="h-4" />
                                            <span>Components</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarMenuButton>
                        <CollapsibleContent>
                            {/* <SidebarGroupContent /> */}
                            {items.map((item) => (
                                <SidebarMenuSub key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            typeof item.href === 'string'
                                                ? item.href
                                                : item.href.url,
                                        )}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.href} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuSub>
                            ))}
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(
                                typeof item.href === 'string'
                                    ? item.href
                                    : item.href.url,
                            )}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
