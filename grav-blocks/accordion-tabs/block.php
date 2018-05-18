<?php

$format = isset($format) ? $format : get_sub_field('format');
$sections = isset($sections) ? $sections : get_sub_field('sections');
$add_side_content = isset($add_side_content) ? $add_side_content : get_sub_field('add_side_content');

if ($add_side_content) {
	$side_content_placement = get_sub_field('side_content_placement');

	if ($side_content_placement == 'right') {
		$content_classes = 'small-order-2';
		$accordion_classes = 'small-order-1';
	}
} ?>

<?php if ($sections) { ?>

	<div class="block-inner">
		<div class="<?php echo GRAV_BLOCKS::css()->row()->add('align-center')->get();?>">
			<?php if ($add_side_content): ?>
			<div class="<?php echo GRAV_BLOCKS::css()->col(12, 4, 5)->add(array('block-accordion-tabs__side-content', ($add_side_content) ? $content_classes : ''))->get(); ?>">
				<?php if ($side_content = get_sub_field('side_content')) { ?>
					<?php echo $side_content; ?>
				<?php } ?>
			</div>
			<?php endif; ?>
			<div class="<?php echo GRAV_BLOCKS::css()->col(12, ($add_side_content) ? 8 : 12, ($add_side_content) ? 5 : 10)->add(array('block-accordion-tabs__container',($add_side_content) ? $accordion_classes : '', $format))->get(); ?>">
				<?php if ($format == 'tabs-top' || $format == 'tabs-left') { ?>
					<ul class="block-accordion-tabs__tab-list show-for-medium">
						<?php foreach ($sections as $key => $section): ?>
							<li class="block-accordion-tabs__tab-list--item<?php echo ($key < 1) ? ' active' : ''; ?>" data-target="<?php echo sanitize_title($section['title']); ?>"><?php echo $section['title']; ?></li>
						<?php endforeach; ?>
					</ul>
				<?php } ?>
				<div class="block-accordion-tabs__items">
					<?php foreach ($sections as $key => $section): ?>
						<div id="<?php echo sanitize_title($section['title']); ?>" class="block-accordion-tabs__item<?php echo ($key < 1) ? ' active' : ''; ?>">
							<h3 class="block-accordion-tabs__item--title<?php echo ($format == 'tabs-top' || $format == 'tabs-left') ? ' hide-for-medium' : ''; ?>"><?php echo $section['title']; ?></h3>
							<div class="block-accordion-tabs__item--content">
								<?php echo $section['content']; ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>

<?php
}