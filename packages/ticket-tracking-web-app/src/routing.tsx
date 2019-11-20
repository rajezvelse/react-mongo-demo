import { RouteConfig } from "./interfaces/route-config";
import Tickets from './modules/tickets';
import TicketsList from './modules/tickets/tickets-list';
import CreateTicket from './modules/tickets/create-ticket';
import TicketDetails from './modules/tickets/ticket-details';
import UpdateTicket from './modules/tickets/update-ticket';

export const AppRoutes: Array<RouteConfig> = [
    {
        path: '/tickets',
        component: Tickets,
        childRoutes: [
            {
                path: '/tickets/list',
                component: TicketsList
            },
            {
                path: '/tickets/create',
                component: CreateTicket
            },
            {
                path: '/tickets/:ticketId',
                component: TicketDetails,
                exact: true
            },
            {
                path: '/tickets/:ticketId/edit',
                component: UpdateTicket,
                exact: true
            }
        ]
    }
];