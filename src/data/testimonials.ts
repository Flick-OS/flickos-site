export interface Testimonial {
	quote: string;
	name: string;
}

/** Link to the Facebook post the comments come from; the section links to it when set. */
export const testimonialsSource = '';

/**
 * Shown on the home page under "What people are saying". Quoted from comments
 * on the Facebook post: trimmed with "…", never reworded.
 */
export const testimonials: Testimonial[] = [
	{
		quote: 'I think it’s one of the most interesting distros I’ve come across recently. It is lightweight without looking like it, and offers something different to the usual suspects.',
		name: 'Neville W.',
	},
	{
		quote: 'I thought I’d throw up a VM and check it out. Well? It’s awesome. If you haven’t tried it, you should.',
		name: 'Maurice J.',
	},
	{
		quote: 'Running on a HP Chromebook G4 (G3?), 4GB RAM, Celeron, USB boot. 450MB RAM at idle — not bad.',
		name: 'Engine E.',
	},
	{
		quote: 'Love the clean minimal theme including the menu.',
		name: 'Ryan T.',
	},
];
