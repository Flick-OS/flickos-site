// The FlickOS store (the product repo's docs/design/flickos-store.md). App records live in src/data/apps.ts.
//
// The store is not open. While `open` is false the /apps/ routes build nothing, so the page,
// the terms and every link to them are absent from the public site — not hidden with CSS, not
// deployed at an unguessable address, simply not built.
//
// Preview it locally:          PUBLIC_STORE_PREVIEW=true npm run dev
// Preview it on Vercel:        set PUBLIC_STORE_PREVIEW=true in the Preview environment only.
//                              Preview deployments sit behind Vercel's login, so only the project
//                              owner can open them. Never set it in Production.
//
// To open the store: fill in the checkout links in src/data/apps.ts, set each app's status, write
// the real terms, then set `open` to true here.

export interface StoreProvider {
	/** Shown in the terms: the merchant of record sells the app in its own name (store ADR-002). */
	label: string;
	url: string;
}

const open = false;

const preview = import.meta.env.PUBLIC_STORE_PREVIEW === 'true';

export const store = {
	/** True once the store has opened to the public. */
	open,

	/** The /apps/ routes build when the store is open, or when the maintainer is previewing it. */
	enabled: open || preview,

	/** Preview only: keep the page out of the sitemap and out of search engines. */
	unlisted: !open,

	href: '/apps/',
	termsHref: '/apps/terms/',

	/** Q1, proposed: Lemon Squeezy, with Paddle as the fallback. Phase 0's test-mode spike decides. */
	provider: {
		label: 'Lemon Squeezy',
		url: 'https://www.lemonsqueezy.com/',
	} satisfies StoreProvider,

	/** The command the receipt tells the buyer to run (store ADR-004). */
	keyCommand: 'flickos-control purchases add',

	/** Every app in src/data/apps.ts, one payment (store ADR-005). Offered once two are on sale. Update the price when the list changes. */
	bundle: {
		price: 35,
		checkoutUrl: '',
	},

	/** Refunds, in days. The payment company runs them; a refund revokes the key, not the app. */
	refundDays: 14,

	supportEmail: 'dvbondoy@gmail.com',
};

const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
});

export const price = (amount: number) => usd.format(amount);
